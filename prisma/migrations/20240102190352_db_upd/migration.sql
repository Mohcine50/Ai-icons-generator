/*
  Warnings:

  - Added the required column `style` to the `PromptPropertie` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "PromptPropertie" ADD COLUMN     "style" TEXT NOT NULL;
