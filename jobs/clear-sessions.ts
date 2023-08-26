
import { cronTrigger } from '@trigger.dev/sdk';
import { client } from '@/trigger';
import { clearExpiredSessions } from '@/utils/session';

client.defineJob({
	id: 'clear-redis-sessions',
	name: 'Clear Redis Sessions',
	version: '0.0.1',
	trigger: cronTrigger({
		// 12 AM UTC - every day
		cron: '* * * * *'
	}),
	run: async(payload, io, ctx) => {
		clearExpiredSessions({ logger: io.logger });
	}
});

