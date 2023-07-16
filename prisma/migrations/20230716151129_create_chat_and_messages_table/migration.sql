-- CreateEnum
CREATE TYPE "Role" AS ENUM ('User', 'Ai');

-- CreateTable
CREATE TABLE "Chat" (
    "id" SERIAL NOT NULL,
    "name" TEXT,
    "creatorId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "archived" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "Chat_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Message" (
    "id" SERIAL NOT NULL,
    "text" TEXT NOT NULL,
    "chatId" INTEGER NOT NULL,
    "sender" "Role" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "archived" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "Message_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Chat" ADD CONSTRAINT "Chat_creatorId_fkey" FOREIGN KEY ("creatorId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Message" ADD CONSTRAINT "Message_chatId_fkey" FOREIGN KEY ("chatId") REFERENCES "Chat"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
