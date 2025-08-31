/*
  Warnings:

  - You are about to drop the column `content` on the `Prompts` table. All the data in the column will be lost.
  - You are about to drop the column `title` on the `Prompts` table. All the data in the column will be lost.
  - Added the required column `question` to the `Prompts` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."Prompts" DROP COLUMN "content",
DROP COLUMN "title",
ADD COLUMN     "geminiAnswer" TEXT,
ADD COLUMN     "question" TEXT NOT NULL;
