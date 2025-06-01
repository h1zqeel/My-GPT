import { pgTable, serial, index, text, varchar, integer, date, boolean, pgEnum, jsonb } from 'drizzle-orm/pg-core';


export const users = pgTable('users', {
	id: serial('id'),
	userSub: varchar('userSub', { length: 256 }).unique(),
	openAIKey: varchar('openAIKey', { length: 256 }),
	googleAIKey: varchar('googleAIKey', { length: 256 }),
	anthropicAIKey: varchar('anthropicAIKey', { length: 256 }),
});

export const chats = pgTable('chats', {
	id: serial('id'),
	name: varchar('name', { length: 256 }),
	creatorId: varchar('creatorId', { length: 256 }),
	systemMessage: text('systemMessage').default('You are a helpful AI Assistant'),
	llm: varchar('llm', { length: 256 }).default('openai'),
	model: varchar('model', { length: 256 }).default('gpt-3.5-turbo'),
	createdAt: date('createdAt').defaultNow(),
	archived: boolean('archived').default(false)
}, (chats)=>{
	return {
		creatorIdIdx: index('creatorId_idx').on(chats.creatorId)
	};
});

export const roleEnum = pgEnum('role', ['user', 'assistant', 'system']);

export const messages = pgTable('messages', {
	id: serial('id'),
	content: text('content'),
	chatId: integer('chatId').references(() => chats.id),
	role: roleEnum('role').default('user'),
	createdAt: date('createdAt').defaultNow(),
	archived: boolean('archived').default(false)
}, (messages)=>{
	return {
		chatIdIdx: index('chatId_idx').on(messages.chatId)
	};
});
