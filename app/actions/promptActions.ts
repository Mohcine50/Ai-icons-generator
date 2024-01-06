"use server";

import { auth } from "@clerk/nextjs";
import { env } from "process";
import OpenAI from "openai";
import prisma from "@/lib/db";
import { TPromptProperties } from "@/types/types";
import { revalidatePath } from "next/cache";

const openai = new OpenAI({
  apiKey: env.OPENAI_API_KEY,
  organization: env.OPENAI_ORGINIZATION_KEY,
});

export const clearCollectionsAction = async () => {
  const { userId } = auth();
  const promtps = await prisma.prompt.deleteMany({
    where: {
      userId: userId!,
    },
  });
  revalidatePath("/collection");
  return promtps;
};

export const fetchPrompts = async () => {
  const { userId } = auth();
  try {
    const promtps = await prisma.prompt.findMany({
      where: {
        userId: userId!,
      },
      select: {
        images: true,
        promptProperties: true,
        id: true,
      },
    });
    return promtps;
  } catch (error) {
    throw Error("Error while fetching your prompts");
  }
};

export const addPrompt = async (promptProperties: TPromptProperties) => {
  const { char, style, quantity, color } = promptProperties;

  const { userId } = auth();

  try {
    const images = await prisma.$transaction(
      async (tx) => {
        const user = await tx.user.findUnique({ where: { id: userId! } });

        if (quantity > user?.credits!)
          throw new Error("You don't have enough credits");

        const promptProperties = await tx.promptPropertie.create({
          data: {
            character: char,
            color: color,
            quantity: quantity,
            style: style,
          },
        });
        const prompt = await tx.prompt.create({
          data: { userId: userId!, promptPropertieId: promptProperties.id },
        });

        const images = await generateImages({ char, style, quantity, color });

        images.forEach(async (image) => {
          await tx.image.create({
            data: {
              promptId: prompt.id,
              imageUrl: image.url!,
            },
          });
        });
        const updatedUser = await tx.user.update({
          where: {
            id: userId!,
          },
          data: {
            credits: user?.credits! - quantity,
          },
        });
        return images;
      },
      {
        maxWait: 5000, // default: 2000
        timeout: 20000, // default: 5000
      }
    );
    return { message: "Prompt Generated Successfuly", images };
  } catch (error) {
    let errorMessage = "Failed to generate your icons";
    if (error instanceof Error) {
      errorMessage = error.message;
    }
    return { error: errorMessage };
  }
};

export const deletePropmtById = async ({ id }: { id: string }) => {
  try {
    await prisma.prompt.delete({
      where: { id },
    });
    revalidatePath("/collection");
    return { success: { message: "Prompt deleted Successfuly" } };
  } catch (error) {
    let errorMessage = "Failed to generate your icons";
    if (error instanceof Error) {
      errorMessage = error.message;
    }
    return { error: errorMessage };
  }
};

const generateImages = async (promptProperties: TPromptProperties) => {
  const { char, style, quantity, color } = promptProperties;

  const responseImages = await openai.images.generate({
    prompt:
      "Generate a captivating " +
      style +
      " material  icon featuring an " +
      char +
      " character illuminated by soft light in a dynamic " +
      color +
      " hue. The scene should be set on a dark background to enhance contrast and drama, creating a visually striking effect. Employ a square icon design, ensuring meticulous attention to detail in the 3D rendering to achieve a polished and sophisticated appearance. The interplay of li",
    n: quantity,
    size: "1024x1024",
  });
  const images = responseImages.data;
  return images;
};
