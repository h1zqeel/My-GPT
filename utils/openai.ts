import db from '@/db/connection';
import { chats, messages as messagesModel } from '@/db/schema';
// vercel edge api
import { Configuration, OpenAIApi, ChatCompletionRequestMessage } from 'openai-edge';
import { OpenAIStream, StreamingTextResponse } from 'ai';
import { ChatOpenAI } from 'langchain/chat_models/openai';
import { BytesOutputParser } from 'langchain/schema/output_parser';
import { PromptTemplate } from 'langchain/prompts';

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
			return `${message.role}: ${message.content}`;
		});
		console.log({ messagesForOpenAI });
		// TODO: Add a way to change the temperature
		// TODO: Add a way to change the max_tokens
		const response = await openai.createChatCompletion({
			model: chat?.model || model,
			stream: true,
			messages: [{ 'role': 'system', 'content': chat?.systemMessage }, ...messagesForOpenAI, { 'role': 'user', 'content': message }]
		});

		const TEMPLATE = `${chat?.systemMessage}.
			
			Current conversation:
			{chat_history}

			User: {input}
			AI:`;
		const prompt = PromptTemplate.fromTemplate(TEMPLATE);
		const MODEL = new ChatOpenAI({
			modelName: chat?.model || model
		});

		const outputParser = new BytesOutputParser();

		const chain = prompt.pipe(MODEL).pipe(outputParser);

		const stream = await chain.stream({
			chat_history: messagesForOpenAI.join('\n'),
			input: message
		});


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