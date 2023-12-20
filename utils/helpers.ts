export const parseOpenAIError = (statusCode : number) => {
	switch (statusCode) {
	case 400:
		return 'Your API Key seems to be incorrect, Please add a valid API Key in Settings.';
	case 401:
		return 'Your API Key seems to be incorrect, Please add a valid API Key in Settings.';
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