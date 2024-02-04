import React, { Suspense, use, useEffect } from "react";
import PropTypes from "prop-types";
import { TGeneratedImages } from "../page";
import clsx from "clsx";
import ImageSkeleton from "./imageSkeleton";

type Props = {
  generatedImages: TGeneratedImages | undefined;
};

function GeneratedImages({ generatedImages }: Props) {
  const { prompt, images } = generatedImages!;

  return (
    <div className={clsx("grow flex flex-col gap-2 py-2")}>
      <div className="flex gap-2 items-center p-2 mt-5">
        <p>
          <span className="text-xl font-bold">Character:</span> {prompt.char}
        </p>
        <p>
          <span className="text-xl font-bold">Style:</span> {prompt.style}
        </p>
        <p>
          <span className="text-xl font-bold">Color:</span> {prompt.color}
        </p>
        <p>
          <span className="text-xl font-bold">Quantity:</span> {prompt.quantity}
        </p>
      </div>
      <br />
      <div className="flex gap-3">
        {images?.map((image, idx) => {
          return (
            <ImageSkeleton src={image.url as string} key={idx} idx={idx} />
          );
        })}
      </div>
    </div>
  );
}

export default GeneratedImages;
