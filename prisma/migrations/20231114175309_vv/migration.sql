/*
  Warnings:

  - You are about to drop the column `prompt` on the `Prompt` table. All the data in the column will be lost.
  - Added the required column `promptText` to the `Prompt` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Prompt" DROP COLUMN "prompt",
ADD COLUMN     "promptText" TEXT NOT NULL;
