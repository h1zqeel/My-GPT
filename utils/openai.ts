import db from '@/db/connection';
import { chats, messages as messagesModel } from '@/db/schema';
// vercel edge api
import { Configuration, OpenAIApi, ChatCompletionRequestMessage } from 'openai-edge';
import { OpenAIStream, StreamingTextResponse } from 'ai';
// openai node api
import { Configuration as CFG, OpenAIApi as OAA } from 'openai';
import { TUser } from '@/types/User';
import { eq, sql } from 'drizzle-orm';

export const askGPT = async({ message, openAIKey, model = 'gpt-3.5-turbo', chatId } : {message: string, openAIKey?: string, model?: string, chatId: number | string}) =>  {
	const configuration = new Configuration({
		apiKey: openAIKey
	});
	const openai = new OpenAIApi(configuration);

	try {
		const chat = (await db.select().from(chats)
			.where(eq(chats.id, Number(chatId))))[0];
		let messages = await db.select().from(messagesModel)
			.where(eq(messagesModel.chatId, Number(chatId)))
			.orderBy(sql`${messagesModel.id} ASC`);

		const messagesForOpenAI : any = messages.map(message=>{
			return {
				role: message.role,
				content: message.content
			};
		});
		console.log({ messagesForOpenAI });
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

export const getAllowedModels = async({ user }: {user: TUser | null}) => {
	const configuration = new CFG({
		apiKey: user?.openAIKey
	});
	const openai = new OAA(configuration);
	const res = await openai.listModels();
	return res.data;
};