import db from '@/prisma/db';
import { Configuration, OpenAIApi, ChatCompletionRequestMessage } from 'openai-edge';
import { OpenAIStream, StreamingTextResponse } from 'ai';

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

		const response = await openai.createChatCompletion({
			model,
			stream: true,
			messages: [{ 'role': 'system', 'content': chat?.systemMessage }, ...messagesForOpenAI, { 'role': 'user', 'content': message }]
		});

		const stream = OpenAIStream(response);

		return new StreamingTextResponse(stream);
	} catch (error : any) {
		return {
			role: '',
			content: parseOpenAIError(error.response!.status)
		};
	}
};

const parseOpenAIError = (statusCode : number) => {
	switch (statusCode) {
	case 401:
		return 'Incorrect API key provided';
	case 429:
		return 'Rate limit reached for requests';
	case 500:
		return 'The server had an error while processing your request';
	case 503:
		return 'The server is currently unavailable';
	default:
		return 'Something went wrong';
	}
};