import { NextRequest, NextResponse } from 'next/server';
import { chatBelongsToUser } from '@/utils/customMiddlewares';
import { askAI } from '@/utils/ai';
import { getUserSession } from '@/utils/user';
import { errors } from '@/constants';


export async function POST(
	request: NextRequest,
	context: { params: Promise<{ id: string }> }
) {
	const { id } = await context.params;
	const chatId = Number(id);

	const guard = await chatBelongsToUser(request, { id: chatId });
	if (guard) return guard;

	const { prompt } = await request.json();
	if (!prompt) {
		return NextResponse.json(
			{ ok: false, error: errors.AI.PROMPT_REQUIRED },
			{ status: 400 }
		);
	}

	const user = await getUserSession();
	const gptResponse = await askAI({ chatId, message: prompt, user: user! });

	return gptResponse;
}
