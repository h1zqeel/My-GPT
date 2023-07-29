import db from '@/prisma/db';
// vercel edge api
import { Configuration, OpenAIApi, ChatCompletionRequestMessage } from 'openai-edge';
import { OpenAIStream, StreamingTextResponse } from 'ai';
// openai node api
import { Configuration as CFG, OpenAIApi as OAA } from 'openai';
import { TUser } from '@/types/User';

export const askGPT = async({ message, openAIKey, model = 'gpt-3.5-turbo', chatId } : {message: string, openAIKey: string, model?: string, chatId: number | string}) =>  {
	const configuration = new Configuration({
		apiKey: openAIKey
	});
	const openai = new OpenAIApi(configuration);

	try {
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

		// TODO: Add a way to change the temperature
		// TODO: Add a way to change the max_tokens
		const response = await openai.createChatCompletion({
			model: chat?.model || model,
			stream: true,
			messages: [{ 'role': 'system', 'content': chat?.systemMessage }, ...messagesForOpenAI, { 'role': 'user', 'content': message }]
		});

		const stream = OpenAIStream(response);

		return new StreamingTextResponse(stream);
	} catch (error : any) {
		throw error;
	}
};

export const getAllowedModels = async({ user }: {user: TUser}) => {
	const configuration = new CFG({
		apiKey: user.openAIKey
	});
	const openai = new OAA(configuration);
	const res = await openai.listModels();
	return res.data;
};