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
import ImageSkeleton from "../../generate/_components/imageSkeleton";

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
                      {prompt.images.map((image: image, idx) => {
                        return (
                          <div
                            key={image.id}
                            className="relative rounded-lg  border-[3px] border-white shadow-sm"
                          >
                            <ImageSkeleton
                              src={image.imageUrl as string}
                              idx={idx}
                            />
                            <a
                              className="cursor-pointer"
                              href={`/api/download?image=${encodeURIComponent(
                                JSON.stringify(image)
                              )}`}
                              target="_blank"
                            >
                              <svg
                                className="absolute top-1 right-1"
                                width="24px"
                                height="24px"
                                viewBox="0 0 24 24"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                                <g
                                  id="SVGRepo_tracerCarrier"
                                  stroke-linecap="round"
                                  stroke-linejoin="round"
                                ></g>
                                <g id="SVGRepo_iconCarrier">
                                  {" "}
                                  <path
                                    fill-rule="evenodd"
                                    clip-rule="evenodd"
                                    d="M3.46447 3.46447C2 4.92893 2 7.28595 2 12C2 16.714 2 19.0711 3.46447 20.5355C4.92893 22 7.28595 22 12 22C16.714 22 19.0711 22 20.5355 20.5355C22 19.0711 22 16.714 22 12C22 7.28595 22 4.92893 20.5355 3.46447C19.0711 2 16.714 2 12 2C7.28595 2 4.92893 2 3.46447 3.46447ZM9.25 7C9.25 6.58579 8.91421 6.25 8.5 6.25C8.08579 6.25 7.75 6.58579 7.75 7V11.9285L6.57617 10.5199C6.31099 10.2017 5.83807 10.1587 5.51986 10.4238C5.20165 10.689 5.15866 11.1619 5.42383 11.4801L7.92383 14.4801C8.06633 14.6511 8.27742 14.75 8.5 14.75C8.72259 14.75 8.93367 14.6511 9.07617 14.4801L11.5762 11.4801C11.8413 11.1619 11.7983 10.689 11.4801 10.4238C11.1619 10.1587 10.689 10.2017 10.4238 10.5199L9.25 11.9285V7ZM15.5 6.25C15.9142 6.25 16.25 6.58579 16.25 7V11.9285L17.4238 10.5199C17.689 10.2017 18.1619 10.1587 18.4801 10.4238C18.7983 10.689 18.8413 11.1619 18.5762 11.4801L16.0762 14.4801C15.9337 14.6511 15.7226 14.75 15.5 14.75C15.2774 14.75 15.0663 14.6511 14.9238 14.4801L12.4238 11.4801C12.1587 11.1619 12.2017 10.689 12.5199 10.4238C12.8381 10.1587 13.311 10.2017 13.5762 10.5199L14.75 11.9285V7C14.75 6.58579 15.0858 6.25 15.5 6.25ZM6 16.25C5.58579 16.25 5.25 16.5858 5.25 17C5.25 17.4142 5.58579 17.75 6 17.75H18C18.4142 17.75 18.75 17.4142 18.75 17C18.75 16.5858 18.4142 16.25 18 16.25H6Z"
                                    fill="#fff"
                                  ></path>{" "}
                                </g>
                              </svg>
                            </a>
                          </div>
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
