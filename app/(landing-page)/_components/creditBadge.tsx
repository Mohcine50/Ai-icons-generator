"use client";
import { createCheckoutSession } from "@/app/actions/stripe";
import { Badge } from "@/components/ui/badge";
import React from "react";
import CreditsModal from "./creditsModal";

const CreditBadge = ({ credits }: { credits: number }) => {
  const buyCredits = () => {
    createCheckoutSession({ quantity: 10 });
  };
  return <CreditsModal credits={credits} />;
};

export default CreditBadge;
