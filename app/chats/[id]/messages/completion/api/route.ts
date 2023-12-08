import { NextRequest, NextResponse } from 'next/server';
import { createEdgeRouter } from 'next-connect';
import { chatBelongsToUser } from '@/utils/customMiddlewares';
import { askAI } from '@/utils/ai';
import { getUserSession } from '@/utils/session';
import { errors } from '@/constants';
interface RequestContext {
	params: {
		id: number | string;
	};
}

const router = createEdgeRouter<NextRequest, RequestContext>();

router
	.use(chatBelongsToUser)
	.post(async(req: NextRequest, { params } : RequestContext) => {
		const { id: chatId } = params;
		const { prompt } = await req.json();
		const user = await getUserSession({ req });

		if(!prompt) {
			return NextResponse.json(
				{
					ok: false,
					error: errors.OPEN_AI.PROMPT_REQUIRED
				},
				{ status: 400 }
			);
		}

		const gptResponse = await askAI({ chatId, message: prompt, user: user! });

		return gptResponse;
	})
;

async function handler(request: NextRequest, ctx: RequestContext) {
	return router.run(request, ctx) as any;
}

export { handler as GET, handler as POST };