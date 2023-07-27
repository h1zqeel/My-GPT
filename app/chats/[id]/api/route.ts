import { NextRequest, NextResponse } from 'next/server';
import db from '@/prisma/db';
import { createEdgeRouter } from 'next-connect';
import { chatBelongsToUser } from '@/utils/customMiddlewares';
import { askGPT } from '@/utils/openai';
import { getUserSession } from '@/utils/session';
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
		const messages = await db.message.findMany({
			where: {
				chatId: Number(chatId)
			}
		});

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

		if(!content) {
			return NextResponse.json(
				{
					ok: false,
					error: 'Content is required'
				},
				{ status: 400 }
			);
		}

		const message = await db.message.create({
			data: {
				content,
				role,
				chatId: Number(chatId)
			}
		});

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