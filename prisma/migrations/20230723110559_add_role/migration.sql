-- CreateEnum
CREATE TYPE "Role" AS ENUM ('user', 'assistant', 'system');

-- AlterTable
ALTER TABLE "Message" ADD COLUMN     "role" "Role" NOT NULL DEFAULT 'user';
