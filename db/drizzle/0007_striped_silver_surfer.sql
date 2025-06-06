ALTER TABLE "users" DROP CONSTRAINT "users_username_unique";--> statement-breakpoint
ALTER TABLE "users" DROP CONSTRAINT "users_email_unique";--> statement-breakpoint
ALTER TABLE "chats" DROP CONSTRAINT "chats_creatorId_users_id_fk";
--> statement-breakpoint
DROP INDEX "creatorId_idx";--> statement-breakpoint
ALTER TABLE "chats" ALTER COLUMN "creatorId" SET DATA TYPE varchar(256);--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "userSub" varchar(256);--> statement-breakpoint
ALTER TABLE "users" DROP COLUMN "name";--> statement-breakpoint
ALTER TABLE "users" DROP COLUMN "username";--> statement-breakpoint
ALTER TABLE "users" DROP COLUMN "email";--> statement-breakpoint
ALTER TABLE "users" DROP COLUMN "password";--> statement-breakpoint
ALTER TABLE "users" DROP COLUMN "providers";--> statement-breakpoint
ALTER TABLE "users" ADD CONSTRAINT "users_userSub_unique" UNIQUE("userSub");