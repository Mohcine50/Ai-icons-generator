/*
  Warnings:

  - You are about to drop the column `promptText` on the `Prompt` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[promptPropertieId]` on the table `Prompt` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `promptPropertieId` to the `Prompt` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Prompt" DROP COLUMN "promptText",
ADD COLUMN     "promptPropertieId" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "PromptPropertie" (
    "id" TEXT NOT NULL,
    "character" TEXT NOT NULL,
    "color" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL,

    CONSTRAINT "PromptPropertie_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Prompt_promptPropertieId_key" ON "Prompt"("promptPropertieId");

-- AddForeignKey
ALTER TABLE "Prompt" ADD CONSTRAINT "Prompt_promptPropertieId_fkey" FOREIGN KEY ("promptPropertieId") REFERENCES "PromptPropertie"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
