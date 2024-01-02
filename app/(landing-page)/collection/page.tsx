"use client";
import { fetchPrompts } from "@/actions/promptActions";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import React, { useEffect, useState } from "react";
import Image from "next/image";

type image = {
  id: string;
  promptId: string;
  imageUrl: string;
};
type collectionType = {
  images: image[];
  promptProperties: {
    id: string;
    character: string;
    color: string;
    style: string;
    quantity: number;
  };
};

const Collection = () => {
  const [collection, setCollection] = useState<collectionType[]>();
  useEffect(() => {
    fetchPrompts()
      .then((data) => {
        setCollection(data);
      })
      .catch((Error) => {
        console.log(JSON.stringify(Error));
      });
  }, []);

  return (
    <div className="flex flex-col items-center justify-center">
      {collection?.map((prompt: collectionType, index: number) => {
        return (
          <>
            <Accordion type="single" collapsible className="max-w-2xl w-full">
              <AccordionItem value="item-1">
                <AccordionTrigger>
                  {prompt.promptProperties.character}
                </AccordionTrigger>
                <AccordionContent>
                  <div className="flex gap-3 flex-wrap">
                    {prompt.images.map((image: image, idx: number) => {
                      return (
                        <Image
                          key={idx}
                          src={image.imageUrl as string}
                          alt={idx.toString()}
                          width="120"
                          height={120}
                          className="rounded-lg  border-[3px] border-white shadow-sm"
                        />
                      );
                    })}
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </>
        );
      })}
    </div>
  );
};

export default Collection;
