import db from '@/db/connection';
import { chats, messages as messagesModel } from '@/db/schema';
import { StreamingTextResponse } from 'ai';
import { ChatOpenAI } from 'langchain/chat_models/openai';
import { ChatGooglePaLM } from 'langchain/chat_models/googlepalm';
import { ChatGoogleGenerativeAI } from '@langchain/google-genai';
import { ChatAnthropic } from '@langchain/anthropic';
import { BytesOutputParser } from 'langchain/schema/output_parser';
import { PromptTemplate } from 'langchain/prompts';

// openai node api
import { Configuration as CFG, OpenAIApi as OAA } from 'openai';
import { TUser } from '@/types/User';
import { eq, sql } from 'drizzle-orm';
import axios from 'axios';
import { parseGoogleError, parseOpenAIError } from './helpers';

export const askAI = async({ message, user, model = 'gpt-3.5-turbo', chatId } : {message: string, user: TUser, model?: string, chatId: number | string}) =>  {
	try {
		const chat = (await db.select().from(chats)
			.where(eq(chats.id, Number(chatId))))[0];
		let messages = await db.select().from(messagesModel)
			.where(eq(messagesModel.chatId, Number(chatId)))
			.orderBy(sql`${messagesModel.id} ASC`);

		const messagesForLLM : any = messages.map(message=>{
			return `${message.role}: ${message.content}`;
		});

		const TEMPLATE = `{systemMessage}.
			Current Conversation: {chatHistory}
			user: {input}
			assistant:`;

		const prompt = PromptTemplate.fromTemplate(TEMPLATE);

		let LLM : any;

		if(chat?.llm === 'googlepalm') {
			LLM = new ChatGooglePaLM({
				modelName: chat?.model || model,
				apiKey: user.googleAIKey
			});
		} else if(chat?.llm === 'googlegemini') {
			LLM = new ChatGoogleGenerativeAI({
				modelName: chat?.model || model,
				apiKey: user.googleAIKey
			});
		} else if(chat?.llm === 'claude') {
			LLM = new ChatAnthropic({
				modelName: chat?.model || model,
				anthropicApiKey: user.anthropicAIKey
			});
		} else {
			LLM = new ChatOpenAI({
				modelName: chat?.model || model,
				openAIApiKey: user.openAIKey
			});
		}

		const outputParser = new BytesOutputParser();

		const chain = prompt.pipe(LLM).pipe(outputParser);

		const stream = await chain.stream({
			systemMessage: chat?.systemMessage || 'Helpful AI Assitant',
			chatHistory: messagesForLLM.join('\n'),
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

	let openaiModels: any = { data: [] };
	let googleModels: any = { data: { models: [] } };
	let claudeModels: any = [];

	try {
		if(user?.openAIKey && user?.openAIKey.length) {
			openaiModels = await openai.listModels();
		}
	} catch (e: any) {
		throw new Error(parseOpenAIError(e.response?.status));
	}

	try {
		if (user?.googleAIKey && user?.googleAIKey.length) {
			const palmModels = await axios.get(
				'https://generativelanguage.googleapis.com/v1beta2/models?key=' + user?.googleAIKey
			);

			const geminiModels = await axios.get(
				'https://generativelanguage.googleapis.com/v1/models?key=' + user?.googleAIKey
			);

			googleModels = {
				data: {
					models: [
						...palmModels.data.models,
						...geminiModels.data.models
					]
				}
			};

		}
	} catch (e: any) {
		throw new Error (parseGoogleError(e.response?.status));
	}

	if(user?.anthropicAIKey && user?.anthropicAIKey.length) {
		claudeModels = [
			{ id: 'claude-2.0', name: 'Claude 2' },
			{ id: 'claude-2.1', name: 'Claude 2.1' },
			{ id: 'claude-3-sonnet-20240229', name: 'Claude 3 Sonnet' },
			{ id: 'claude-3-opus-20240229', name: 'Claude 3 Opus' }
		];
	}


	return { openAIModels: openaiModels.data, googleModels: googleModels.data, claudeModels };
};
