import db from '@/db/connection';
import { messages as messagesModel } from '@/db/schema';
import { eq } from 'drizzle-orm';
import { NextRequest, NextResponse } from 'next/server';
import { createEdgeRouter } from 'next-connect';
import { chatBelongsToUser } from '@/utils/customMiddlewares';
import { errors } from '@/constants';
interface RequestContext {
	params: {
		id: number | string;
	};
}

export const runtime = 'edge';

const router = createEdgeRouter<NextRequest, RequestContext>();

router
	.use(chatBelongsToUser)
	.get(async(req: NextRequest, { params } : RequestContext)=>{
		const { id: chatId } = params;
		console.time('messages::GET');

		const messages = await db.select().from(messagesModel)
			.where(eq(messagesModel.chatId, Number(chatId)));

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
		const { content, role } = await req.json();

		if(!content || !role) {
			return NextResponse.json(
				{
					ok: false,
					error: errors.OPEN_AI.CONTENT_ROLE_REQUIRED
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
	return router.run(request, ctx);
}

export { handler as GET, handler as POST };