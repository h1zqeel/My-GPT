DO $$ BEGIN
 CREATE TYPE "role" AS ENUM('user', 'assistant', 'system');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "chats" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar(256),
	"creatorId" integer,
	"systemMessage" text DEFAULT 'You are a helpful AI Assistant',
	"model" varchar(256) DEFAULT 'gpt-3.5-turbo',
	"createdAt" date DEFAULT now(),
	"archived" boolean DEFAULT false
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "messages" (
	"id" serial PRIMARY KEY NOT NULL,
	"content" text,
	"chatId" integer,
	"role" "role" DEFAULT 'user',
	"createdAt" date DEFAULT now(),
	"archived" boolean DEFAULT false
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "users" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text,
	"username" varchar(256),
	"email" varchar(256),
	"password" varchar(256),
	"openAIKey" varchar(256),
	"providers" json,
	CONSTRAINT "users_username_unique" UNIQUE("username"),
	CONSTRAINT "users_email_unique" UNIQUE("email")
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "chats" ADD CONSTRAINT "chats_creatorId_users_id_fk" FOREIGN KEY ("creatorId") REFERENCES "users"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "messages" ADD CONSTRAINT "messages_chatId_chats_id_fk" FOREIGN KEY ("chatId") REFERENCES "chats"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
