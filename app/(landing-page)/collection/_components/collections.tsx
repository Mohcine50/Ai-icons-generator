import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import React from "react";
import Image from "next/image";
import { fetchPrompts } from "@/app/actions/promptActions";
import { collectionType, image } from "@/types/types";
import PropmtItem from "./propmtItem";
import DownloadImages from "./downloadImages";

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
        collections.reverse().map((prompt: collectionType, index: number) => {
          return (
            <>
              <Accordion type="single" collapsible className="max-w-3xl w-full">
                <AccordionItem value="item-1">
                  <AccordionTrigger className="hover:no-underline ">
                    <PropmtItem prompt={prompt} />
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
                    <DownloadImages prompt={prompt} />
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
