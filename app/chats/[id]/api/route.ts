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
		const { text } = await req.json();
		const user = await getUserSession(req);

		if(!text) {
			return NextResponse.json(
				{
					ok: false,
					error: 'Text is required'
				},
				{ status: 400 }
			);
		}

		const gptResponse = await askGPT({ chatId, message: text, openAIKey: user.openAIKey });

		if(!gptResponse?.content?.length) {
			return NextResponse.json(
				{
					ok: false,
					error: 'Something went wrong'
				},
				{ status: 500 }
			);
		}

		return NextResponse.json(
			{
				ok: true,
				prompt: text,
				gptResponse
			},
			{ status: 200 }
		);
	})
;

async function handler(request: NextRequest, ctx: RequestContext) {
	return router.run(request, ctx);
}

export { handler as GET, handler as POST };