export const errors = {
	NO_KEY: 'OpenAI Key not found, please add it in Settings Page',
	DEFAULT: 'Something went wrong, please try again later',
	DUPLICATE_USERNAME: 'Username already exists',
	USERNAME_PASSWORD_EMPTY: 'Username or Password cannot be Empty',
	USERNAME_PASSWORD_INCORRECT: 'Username or Password is incorrect',
	NO_USER: 'User not found',
	NO_CHAT_PERMISSION: 'You do not have permission to access chat',
	INVALID_USERNAME_PASSWORD: 'Invalid username or password: username and password must be at least 6 characters long and passwords must match',
	REGISTRATION_SUCCESS: 'Registration successful, redirecting to login page',
	EMPTY_MESSAGE: 'Message cannot be empty',
	OPEN_AI: {
		CONTENT_ROLE_REQUIRED: 'Content and Role is required',
		PROMPT_REQUIRED: 'Prompt is required',
		FAILED_REQUEST: 'Request Failed: Is your Open AI Key Valid ?'
	}
};

export const gptModels = [
	{ value: 'gpt-3.5-turbo', name: 'GPT 3.5 Turbo' },
	{ value: 'gpt-3.5-turbo-16k', name: 'GPT 3.5 Turbo 16k' },
	{ value: 'gpt-4', name: 'GPT 4' },
	{ value: 'gpt-4-32k', name: 'GPT 4 32k' }
];