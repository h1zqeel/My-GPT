/*
  Warnings:

  - You are about to drop the column `sender` on the `Message` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Message" DROP COLUMN "sender";

-- DropEnum
DROP TYPE "Role";
