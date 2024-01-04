"use client";
import { clearCollectionsAction } from "@/app/actions/promptActions";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import React from "react";

const ClearButton = () => {
  const { toast } = useToast();

  const clearCollecions = () => {
    clearCollectionsAction()
      .then((data) => {
        toast({
          title: "Clear collection",
          description: "Your collection cleared successfully",
        });
      })
      .catch((Error) => {
        toast({
          title: "Clear collection",
          description: "Your collection cleared successfully",
          variant: "destructive",
        });
      });
  };

  return (
    <Button onClick={clearCollecions} className="mt-5">
      Clear
    </Button>
  );
};

export default ClearButton;
