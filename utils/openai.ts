import db from '@/prisma/db';
import { Configuration, OpenAIApi, ChatCompletionRequestMessage } from 'openai';

export const askGPT = async({ message, openAIKey, model = 'gpt-3.5-turbo', chatId } : {message: string, openAIKey: string, model?: string, chatId: number | string}) =>  {
	const configuration = new Configuration({
		apiKey: openAIKey
	});
	const openai = new OpenAIApi(configuration);

	await db.message.create({
		data: {
			content: message,
			chatId: Number(chatId),
			role: 'user'
		}
	});

	const chat = await db.chat.findUnique({
		where: {
			id: Number(chatId)
		}
	});

	let messages = await db.message.findMany({
		orderBy: {
			id: 'asc'
		},
		where: {
			chatId: Number(chatId)
		}
	});

	const messagesForOpenAI : ChatCompletionRequestMessage[] = messages.map(message=>{
		return {
			role: message.role,
			content: message.content
		};
	});

	const { data : { choices:[{ message: gptResponse }] } } = await openai.createChatCompletion({
		model,
		// TODO: Add a way to change the temperature
		// TODO: Add a way to change the max_tokens
		messages: [{ 'role': 'system', 'content': chat?.systemMessage }, ...messagesForOpenAI]
	});

	await db.message.create({
		data: {
			content: String(gptResponse?.content),
			chatId: Number(chatId),
			role: 'assistant'
		}
	});

	return gptResponse;
};