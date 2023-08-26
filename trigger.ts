import { TriggerClient } from '@trigger.dev/sdk';

export const client = new TriggerClient({
	id: 'mygpt-Es4P',
	apiKey: process.env.TRIGGER_API_KEY
});
