import { clearCollectionsAction, fetchPrompts } from "@/actions/promptActions";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import React, { Suspense, useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import ClearButton from "./_components/clearButton";
import Collections from "./_components/collections";
import Loading from "./loading";

const Collection = () => {
  return (
    <div className="flex flex-col items-center">
      <ClearButton />
      <div className="flex flex-col items-center justify-center w-full">
        <Suspense fallback={<Loading />}>
          <Collections />
        </Suspense>
      </div>
    </div>
  );
};

export default Collection;
