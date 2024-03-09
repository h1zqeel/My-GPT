export type TUser = {
	id: number,
	username?: string,
	name: string,
	openAIKey: string,
	googleAIKey: string,
	anthropicAIKey: string,
	email?: string,
	providers?: any
}