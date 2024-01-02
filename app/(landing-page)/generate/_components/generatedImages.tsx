"use client";
import React, { use, useEffect } from "react";
import PropTypes from "prop-types";
import { TGeneratedImages } from "../page";
import Image from "next/image";
import clsx from "clsx";

type Props = {
  generatedImages: TGeneratedImages | undefined;
};

function GeneratedImages({ generatedImages }: Props) {
  const { prompt, images } = generatedImages!;

  return (
    <div className={clsx("grow flex flex-col gap-2")}>
      <div className="flex gap-1 items-center">
        <p>Character: {prompt.char}</p>
        <p>Style: {prompt.style}</p>
        <p>Color: {prompt.color}</p>
        <p>Quantity {prompt.quantity}</p>
      </div>
      <br />
      <div className="flex gap-3">
        {images?.map((image, idx) => {
          return (
            <Image
              key={idx}
              src={image?.url as string}
              alt={idx.toString()}
              width="120"
              height={10}
              className="rounded-lg  border-[3px] border-white shadow-sm"
            />
          );
        })}
      </div>
    </div>
  );
}

export default GeneratedImages;
