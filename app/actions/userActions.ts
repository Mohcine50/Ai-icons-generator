import prisma from "@/lib/db";
import { auth } from "@clerk/nextjs";
import { number, string } from "zod";

//Get user from db
export const getConnectedUser = async () => {
  const { userId } = auth();
  try {
    let user = await prisma.user.findUnique({
      where: {
        id: userId!,
      },
    });

    if (!user) {
      user = await prisma.user.create({
        data: { id: userId! },
      });
    }
    return user;
  } catch (error) {
    console.log(error);
  }
};

// update user credits after succesful payments
export const updateUserCredits = async ({
  credits,
  userId,
}: {
  credits: number;
  userId: string;
}) => {
  try {
    const user = await prisma.user.findUnique({ where: { id: userId } });
    const updatedUser = await prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        credits: user?.credits! + credits,
      },
    });
  } catch (error) {
    console.log(error);
  }
};
