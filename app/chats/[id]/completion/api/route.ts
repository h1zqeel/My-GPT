import { NextRequest, NextResponse } from 'next/server';
import { createEdgeRouter } from 'next-connect';
import { chatBelongsToUser } from '@/utils/customMiddlewares';
import { askGPT } from '@/utils/openai';
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
		const user = await getUserSession(req);

		if(!prompt) {
			return NextResponse.json(
				{
					ok: false,
					error: errors.OPEN_AI.PROMPT_REQUIRED
				},
				{ status: 400 }
			);
		}

		const gptResponse = await askGPT({ chatId, message: prompt, openAIKey: user.openAIKey });

		return gptResponse;
	})
;

async function handler(request: NextRequest, ctx: RequestContext) {
	return router.run(request, ctx);
}

export { handler as GET, handler as POST };