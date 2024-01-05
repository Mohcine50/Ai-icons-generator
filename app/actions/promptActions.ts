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
    const user = await prisma.user.findUnique({ where: { id: userId! } });

    if (quantity > user?.credits!)
      throw new Error("You don't have enough credits");

    const promptProperties = await prisma.promptPropertie.create({
      data: {
        character: char,
        color: color,
        quantity: quantity,
        style: style,
      },
    });
    const prompt = await prisma.prompt.create({
      data: { userId: userId!, promptPropertieId: promptProperties.id },
    });

    const images = await generateImages();

    images.forEach(async (image) => {
      await prisma.image.create({
        data: {
          promptId: prompt.id,
          imageUrl: image.url!,
        },
      });
    });
    const updatedUser = await prisma.user.update({
      where: {
        id: userId!,
      },
      data: {
        credits: user?.credits! - quantity,
      },
    });
    return { message: "Prompt Generated Successfuly", images };
  } catch (error) {
    return { error: error.message as string };
  }
};

const generateImages = async () => {
  const responseImages = await openai.images.generate({
    prompt:
      "Generate a captivating metalic material icon featuring an angry lion character illuminated by soft light in a dynamic red hue. The scene should be set on a dark background to enhance contrast and drama, creating a visually striking effect. Employ a square icon design, ensuring meticulous attention to detail in the 3D rendering to achieve a polished and sophisticated appearance. The interplay of li",
    n: 2,
    size: "1024x1024",
  });
  const images = responseImages.data;
  return images;
};
