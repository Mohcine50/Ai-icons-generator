"use client";

import { deletePropmtById, downloadImages } from "@/app/actions/promptActions";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { collectionType, image } from "@/types/types";
import React from "react";

type props = {
  prompt: collectionType;
};

const DownloadImages = ({ prompt }: props) => {
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
  const handleDownload = async (images: image[]) => {
    const result = await downloadImages(images);
    if (result.error) console.log(result.error);
    else console.log(result.imagesBlops);
  };
  return (
    <div>
      <Button onClick={() => handleDownload(prompt.images)}>
        Download images
      </Button>

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

export default DownloadImages;
