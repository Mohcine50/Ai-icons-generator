"use client";
import React from "react";
import { collectionType } from "@/types/types";
import { Button } from "@/components/ui/button";
import { deletePropmtById } from "@/app/actions/promptActions";
import { revalidatePath } from "next/cache";
import { useToast } from "@/components/ui/use-toast";
import { headers } from "next/headers";

type props = {
  prompt: collectionType;
};

const PropmtItem = ({ prompt }: props) => {
  const { toast } = useToast();
  const deletePropmtItem = async (id: string) => {
    const result = await deletePropmtById({ id });
    if (result.success) {
      toast({
        title: "Delete Propt",
        description: "delete successfuly",
      });
    } else
      toast({
        title: "Delete Propt",
        description: "We couldn't delete the prompt",
        variant: "destructive",
      });
  };

  return (
    <div className="flex items-center justify-between w-full">
      <div className="flex gap-2 items-center p-1">
        <p>
          <span className="text-xl font-bold">Character: </span>
          {prompt.promptProperties.character}
        </p>
        <p>
          <span className="text-xl font-bold">Style: </span>
          {prompt.promptProperties.style}
        </p>
        <p>
          <span className="text-xl font-bold">Color: </span>
          {prompt.promptProperties.color}
        </p>
        <p>
          <span className="text-xl font-bold">Quantity: </span>
          {prompt.promptProperties.quantity}
        </p>
      </div>
      <Button
        variant="outline"
        className="text-red-500"
        onClick={() => deletePropmtItem(prompt.id)}
      >
        Delete
      </Button>
    </div>
  );
};

export default PropmtItem;
