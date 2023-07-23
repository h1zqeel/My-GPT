import db from '@/prisma/db';
import { Configuration, OpenAIApi, ChatCompletionRequestMessage } from 'openai';

export const askGPT = async({ message, openAIKey, model = 'gpt-3.5-turbo', chatId } : {message: string, openAIKey: string, model?: string, chatId: number | string}) =>  {
	try {
		const gptResponse = await db.$transaction(async(transaction) => {
			const configuration = new Configuration({
				apiKey: openAIKey
			});
			const openai = new OpenAIApi(configuration);

			await transaction.message.create({
				data: {
					content: message,
					chatId: Number(chatId),
					role: 'user'
				}
			});

			const chat = await transaction.chat.findUnique({
				where: {
					id: Number(chatId)
				}
			});

			let messages = await transaction.message.findMany({
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

			await transaction.message.create({
				data: {
					content: String(gptResponse?.content),
					chatId: Number(chatId),
					role: 'assistant'
				}
			});
			return gptResponse;
		});
		return gptResponse;
	} catch (err) {
		return {
			role: '',
			content: 'Something went wrong, Is Your Open AI Key Valid ?'
		};
	}
};