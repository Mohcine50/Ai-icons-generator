"use server";

import { auth } from "@clerk/nextjs";
import { env } from "process";
import OpenAI from "openai";
import prisma from "@/lib/db";
import { TPromptProperties, image } from "@/types/types";
import { revalidatePath } from "next/cache";
import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloudName: env.CLOUDNAME,
  apiKey: env.API_KEY,
  apiSecret: env.SECRET_KEY,
  secure: true,
});

console.log(cloudinary)

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

  const options = {
    use_filename: true,
    unique_filename: false,
    overwrite: true,
  };
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
          const result = await cloudinary.uploader.upload(image.url!, options);
          await tx.image.create({
            data: {
              promptId: prompt.id,
              imageUrl: result?.url as string,
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
    revalidatePath("/generate");
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

export const downloadImages = async (images: image[]) => {
  const { default: JSZip } = await import("jszip");
  const zip = new JSZip();
  console.info(zip);
  try {
    const _downloadedImages = await exportBlops(images);
    console.log("images", _downloadedImages);
    return { _downloadedImages };
  } catch (error) {
    let errorMessage = "Failed to downloaded your icons";
    if (error instanceof Error) {
      errorMessage = error.message;
    }
    return { error: errorMessage };
  }
};

const exportBlops = async (images: image[]) => {
  const blobs = await Promise.all(
    images.map(async (image: image) => {
      try {
        const response = await fetch(image.imageUrl);

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const blob = await response.blob();
        return blob;
      } catch (error) {
        console.error("Fetch error:", error);
      }
    })
  );

  return blobs;
};
