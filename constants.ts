export const errors = {
	NO_KEY: 'OpenAI Key not found, please add it in Settings Page',
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
	{ value: 'gpt-4-1106-preview', name: 'GPT 4 Turbo Preview', llm: 'openai' },
	{ value: 'models/chat-bison-001', name: 'PaLM 2', llm: 'googlepalm' },
	{ value: 'models/gemini-pro', name: 'Gemini Pro', llm: 'googlegemini' }
];