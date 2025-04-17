import { Writable } from 'stream';
import axios from 'axios';

export default async function (_ : any) {
	return new Writable({
		objectMode: true,
		write(logObj, enc, cb) {
			axios
				.post('http://your-pi-ip:your-port/logs', logObj)
				.catch((err) => {
					console.error('Failed to send log to Raspberry Pi:', err);
				});
			cb();
		},
	});
}
