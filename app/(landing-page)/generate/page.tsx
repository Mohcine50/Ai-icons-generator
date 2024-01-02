"use client";
import React, { useEffect, useState } from "react";
import FormGenerator from "./_components/formGenerator";
import { TPromptProperties } from "@/types/types";
import GeneratedImages from "./_components/generatedImages";
import OpenAI from "openai";
import clsx from "clsx";

export type TGeneratedImages = {
  prompt: TPromptProperties;
  images: OpenAI.Images.Image[] | undefined;
};

const Generate = () => {
  const [generatedImages, setGeneratedImages] = useState<TGeneratedImages>();
  const [showImages, setShowImages] = useState<boolean>(false);

  return (
    <div
      className={clsx(!showImages ? "flex justify-center" : "grid grid-cols-2")}
    >
      <FormGenerator
        setGeneratedImages={setGeneratedImages}
        setShowImages={setShowImages}
      />
      {showImages ? (
        <GeneratedImages generatedImages={generatedImages} />
      ) : null}
    </div>
  );
};

export default Generate;
