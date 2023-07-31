/*
  Warnings:

  - You are about to drop the column `extraInfo` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "extraInfo",
ADD COLUMN     "providers" JSONB;
