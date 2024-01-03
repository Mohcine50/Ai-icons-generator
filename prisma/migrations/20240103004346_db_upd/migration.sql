-- DropForeignKey
ALTER TABLE "Image" DROP CONSTRAINT "Image_promptId_fkey";

-- DropForeignKey
ALTER TABLE "Prompt" DROP CONSTRAINT "Prompt_promptPropertieId_fkey";

-- AddForeignKey
ALTER TABLE "Image" ADD CONSTRAINT "Image_promptId_fkey" FOREIGN KEY ("promptId") REFERENCES "Prompt"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Prompt" ADD CONSTRAINT "Prompt_promptPropertieId_fkey" FOREIGN KEY ("promptPropertieId") REFERENCES "PromptPropertie"("id") ON DELETE CASCADE ON UPDATE CASCADE;
