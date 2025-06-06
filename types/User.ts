import { User } from '@auth0/nextjs-auth0/types';

export interface TUser extends User {
	openAIKey: string;
	googleAIKey: string;
	anthropicAIKey: string;
}
