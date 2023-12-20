export type TUser = {
	id: number,
	username?: string,
	name: string,
	openAIKey: string,
	googleAIKey: string,
	email?: string,
	providers?: any
}