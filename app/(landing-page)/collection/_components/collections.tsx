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
  const collections: collectionType[] =
    (await fetchPrompts()) as collectionType[];

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
                  <AccordionTrigger className="hover:no-underline">
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
