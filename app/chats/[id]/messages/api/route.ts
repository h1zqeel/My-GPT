import db from '@/db/connection';
import pMap from 'p-map';
import { messages as messagesModel } from '@/db/schema';
import { NextRequest, NextResponse } from 'next/server';
import { createEdgeRouter } from 'next-connect';
import { chatBelongsToUser } from '@/utils/customMiddlewares';
import { errors } from '@/constants';
import { getMessages, invalidateMessagesCache } from '@/utils/messages';
interface RequestContext {
	params: {
		id: number | string;
	};
}

const router = createEdgeRouter<NextRequest, RequestContext>();

router
	.use(chatBelongsToUser)
	.get(async(req: NextRequest, { params } : RequestContext)=>{
		const { id: chatId } = params;
		console.time('messages::GET');

		const messages = await getMessages(Number(chatId));

		console.timeEnd('messages::GET');

		return NextResponse.json(
			{
				ok: true,
				messages
			},
			{ status: 200 }
		);
	})
	.post(async(req: NextRequest, { params } : RequestContext) => {
		const { id: chatId } = params;
		const { content, role, messages } = await req.json();
		if(messages) {
			await pMap(messages, async(message : any) => {
				await db.insert(messagesModel).values({ ...message, chatId: Number(chatId) });
			}, { concurrency: 1 });

			await invalidateMessagesCache(Number(chatId));

			return NextResponse.json(
				{
					ok: true,
					messages
				},
				{ status: 200 }
			);
		}

		if(!content || !role) {
			return NextResponse.json(
				{
					ok: false,
					error: errors.AI.CONTENT_ROLE_REQUIRED
				},
				{ status: 400 }
			);
		}

		const message = {
			content,
			role,
			chatId: Number(chatId)
		};

		await db.insert(messagesModel).values(message);
		await invalidateMessagesCache(Number(chatId));

		return NextResponse.json(
			{
				ok: true,
				message
			},
			{ status: 200 }
		);;

	})
;

async function handler(request: NextRequest, ctx: RequestContext) {
	return router.run(request, ctx) as any;
}

export { handler as GET, handler as POST };