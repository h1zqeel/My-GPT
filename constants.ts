export const errors = {
	NO_KEY: 'API Key not found, please add it in Settings Page',
	DEFAULT: 'Something went wrong, please try again later',
	DUPLICATE_USERNAME: 'Username already exists',
	USERNAME_PASSWORD_EMPTY: 'Username or Password cannot be Empty',
	USERNAME_PASSWORD_INCORRECT: 'Username or Password is incorrect',
	NO_USER: 'User not found',
	NO_CHAT_PERMISSION: 'You do not have permission to access chat',
	INVALID_USERNAME_PASSWORD: 'Invalid username or password: username and password must be at least 6 characters long and passwords must match',
	EMPTY_MESSAGE: 'Message cannot be empty',
	INVALID_REQUEST: 'Invalid Request',
	NO_CHAT: 'Chat not found',
	AI: {
		CONTENT_ROLE_REQUIRED: 'Content and Role is required',
		PROMPT_REQUIRED: 'Prompt is required',
		FAILED_REQUEST: 'Request Failed: Is your API Key Valid ?'
	},
	GOOGLE: {
		SIGN_IN: 'Google Sign In Failed, Please Try Again Later',
		EMAIL_UNVERIFIED: 'Your Google Email is not verified, please verify your email and try again'
	},
	GITHUB: {
		SIGN_IN: 'Github Sign In Failed, Please Try Again Later'
	}
};

export const successes ={
	REGISTRATION_SUCCESS: 'Registration successful, redirecting to login page'
};

export const gptModels = [
	{ value: 'gpt-3.5-turbo', name: 'GPT 3.5 Turbo', llm: 'openai' },
	{ value: 'gpt-3.5-turbo-16k', name: 'GPT 3.5 Turbo 16k', llm: 'openai' },
	{ value: 'gpt-4', name: 'GPT 4', llm: 'openai' },
	{ value: 'gpt-4-32k', name: 'GPT 4 32k', llm: 'openai' },
	{ value: 'gpt-4-1106-preview', name: 'GPT 4 (1106) Turbo Preview', llm: 'openai' },
	{ value: 'gpt-4-0125-preview', name: 'GPT 4 (0125) Turbo Preview', llm: 'openai' },
	// { value: 'models/chat-bison-001', name: 'PaLM 2', llm: 'googlepalm' }, deprecated
	// { value: 'models/gemini-1.0-pro-vision-latest', name: 'Gemini 1.0 Pro Vision', llm: 'googlegemini' }, deprecated
	{ value: 'models/gemini-1.5-pro', name: 'Gemini 1.5 Pro', llm: 'googlegemini' },
	{ value: 'models/gemini-1.5-flash', name: 'Gemini 1.5 Flash', llm: 'googlegemini' },
	{ value: 'models/gemini-1.5-flash-8b', name: 'Gemini 1.5 Flash-8B', llm: 'googlegemini' },
	{ value: 'models/gemini-2.0-flash', name: 'Gemini 2.0 Flash', llm: 'googlegemini' },
	{ value: 'claude-2.0', name: 'Claude 2', llm: 'claude' },
	{ value: 'claude-2.1', name: 'Claude 2.1', llm: 'claude' },
	{ value: 'claude-3-sonnet-20240229', name: 'Claude 3 Sonnet', llm: 'claude' },
	{ value: 'claude-3-opus-20240229', name: 'Claude 3 Opus', llm: 'claude' }
];