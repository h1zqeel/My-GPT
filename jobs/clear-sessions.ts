
import { cronTrigger } from '@trigger.dev/sdk';
import { client } from '@/trigger';

client.defineJob({
	id: 'clear-redis-sessions',
	name: 'Clear Redis Sessions',
	version: '0.0.1',
	trigger: cronTrigger({
		// 12 AM UTC - every day
		cron: '0 0 * * *'
	}),
	run: async(payload, io, ctx) => {
		console.log('...')
	}
});

