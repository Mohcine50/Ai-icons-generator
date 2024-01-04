"use client";
import { Badge } from "@/components/ui/badge";
import React from "react";

const CreditBadge = ({ credits }: { credits: number }) => {
  const buyCredits = () => {};
  return (
    <Badge variant="default" onClick={buyCredits} className="cursor-pointer">
      {credits} Credits
    </Badge>
  );
};

export default CreditBadge;
