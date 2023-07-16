/*
  Warnings:

  - You are about to drop the column `openAPIKey` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "openAPIKey",
ADD COLUMN     "openAIKey" TEXT;
