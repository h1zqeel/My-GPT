import axios from 'axios';

export default async function (_ : any) {
	return new WritableStream({
		write: async (chunk: any) => {
			const log = chunk.toString();
			try {
				await axios.post('https://api.example.com/logs', { log });
			} catch (error) {
				console.error('Error sending log:', error);
			}
		}
	});
}
