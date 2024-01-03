"use client";
import { clearCollectionsAction } from "@/actions/promptActions";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import React from "react";

const ClearButton = () => {
  const route = useRouter();

  const clearCollecions = () => {
    clearCollectionsAction()
      .then((data) => {
        route.refresh();
      })
      .catch((Error) => {
        console.log(JSON.stringify(Error));
      });
  };

  return (
    <Button onClick={clearCollecions} className="mt-5">
      Clear
    </Button>
  );
};

export default ClearButton;
