import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import React from "react";
import Image from "next/image";
import { fetchPrompts } from "@/actions/promptActions";

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

const Collections = async () => {
  const collections: collectionType[] = await fetchPrompts();

  return (
    <>
      {collections.length === 0 ? (
        <h1 className="text-2xl text-center font-bold mt-5 p-2">
          No prompt to show on your Collection
        </h1>
      ) : (
        collections.map((prompt: collectionType, index: number) => {
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
        })
      )}
    </>
  );
};

export default Collections;
