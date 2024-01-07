"use client";

import { deletePropmtById } from "@/app/actions/promptActions";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import saveAs from "@/lib/fileSaver";
import { collectionType, image } from "@/types/types";
import Link from "next/link";
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

  return (
    <div className="flex items-center justify-center gap-4 mt-3">
      <Button>
        <a
          href={`/api/archive?images=${encodeURIComponent(
            JSON.stringify(prompt.images)
          )}`}
          target="_blank"
        >
          Download
        </a>
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
