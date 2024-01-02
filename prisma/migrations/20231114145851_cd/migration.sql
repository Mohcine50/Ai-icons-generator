/*
  Warnings:

  - Added the required column `prompt` to the `Prompt` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Prompt" ADD COLUMN     "prompt" TEXT NOT NULL;
