-- AlterTable
ALTER TABLE "User" ADD COLUMN     "extraInfo" JSONB,
ALTER COLUMN "password" DROP NOT NULL;
