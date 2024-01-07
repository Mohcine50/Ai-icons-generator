import React from "react";
import { collectionType } from "@/types/types";

type props = {
  prompt: collectionType;
};

const PropmtItem = ({ prompt }: props) => {
  return (
    <div className="flex items-center justify-between w-full">
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
    </div>
  );
};

export default PropmtItem;
