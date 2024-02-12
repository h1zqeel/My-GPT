export const parseOpenAIError = (statusCode : number) => {
	switch (statusCode) {
	case 400:
		return 'OpenAI: Your API Key seems to be incorrect, Please add a valid OpenAI API Key in Settings or Remove the Invalid OpenAI API Key from Settings.';
	case 401:
		return 'OpenAI: Your API Key seems to be incorrect, Please add a valid OpenAI API Key in Settings or Remove the Invalid OpenAI API Key from Settings.';
	case 429:
		return 'OpenAI: Rate limit reached for requests';
	case 500:
		return 'OpenAI; The server had an error while processing your request';
	case 503:
		return 'OpenAI: The server is currently unavailable';
	default:
		return 'OpenAI: Something went wrong';
	}
};

export const parseGoogleError = (statusCode : number) => {
	switch (statusCode) {
	case 400:
		return 'Google: Your API Key seems to be incorrect, Please add a valid Google AI API Key in Settings or Remove the Invalid Google AI API Key from Settings.';
	case 401:
		return 'Google: Your API Key seems to be incorrect, Please add a valid Google AI API Key in Settings or Remove the Invalid Google AI API Key from Settings.';
	case 429:
		return 'Google: Rate limit reached for requests';
	case 500:
		return 'Google: The server had an error while processing your request';
	case 503:
		return 'Google: The server is currently unavailable';
	default:
		return 'Google: Something went wrong';
	}
};