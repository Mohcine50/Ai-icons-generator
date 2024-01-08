"use server";

import { auth } from "@clerk/nextjs";
import { env } from "process";
import OpenAI from "openai";
import prisma from "@/lib/db";
import { TPromptProperties, image } from "@/types/types";
import { revalidatePath } from "next/cache";
import cloudinary from "@/lib/cloudinary";
import JSZip from "jszip";
import { saveAs } from "@/lib/fileSaver";
import { styleData } from "@/lib/utils";

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

        const cloudinaryLinks = await uploadImagesToCloudinary(images);

        cloudinaryLinks.forEach(async (link) => {
          const uploadImage = await tx.image.create({
            data: {
              promptId: prompt.id,
              imageUrl: link,
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
        maxWait: 50000, // default: 2000
        timeout: 50000, // default: 5000
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

const uploadImagesToCloudinary = async (images: OpenAI.Images.Image[]) => {
  let cloudinaryLinks: string[] = [];

  const options = {
    use_filename: true,
    unique_filename: false,
    overwrite: true,
    transformation: {
      width: 800, // Set the desired width
      height: 800, // Set the desired height
      crop: "limit", // Adjust the cropping strategy as needed
    },
  };

  for (const image of images) {
    try {
      const result = await cloudinary.uploader.upload(image.url!, options);
      if (result) {
        const url = result.url as string;
        cloudinaryLinks.push(url);
      } else {
        throw new Error("We couldn't upload your images");
      }
    } catch (error) {
      throw new Error("Error uploading images to Cloudinary");
    }
  }

  return cloudinaryLinks;
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
      "app icon of " +
      char +
      ", colorized in " +
      color +
      ", " +
      styleData[style] +
      ", with dark background",
    n: quantity,
    size: "1024x1024",
  });
  const images = responseImages.data;
  return images;
};
