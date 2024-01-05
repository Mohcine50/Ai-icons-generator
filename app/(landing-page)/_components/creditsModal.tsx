"use client";

import { createCheckoutSession } from "@/app/actions/stripe";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { useAuth } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import React, { FormEvent, useState } from "react";
import { string } from "zod";

const CreditsModal = ({ credits }: { credits: number }) => {
  const { userId } = useAuth();

  const [quantity, setQuantity] = useState<number>(10);
  const router = useRouter();
  const { toast } = useToast();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const result = await createCheckoutSession({
      quantity,
      userId: userId as string,
    });
    if (result.url) router.replace(result.url);
    else
      toast({
        title: "Buy credit",
        description: "Failed to redirect to checkout page",
        variant: "destructive",
      });
  };

  return (
    <>
      <Dialog>
        <DialogTrigger asChild>
          <Badge variant="default" className="cursor-pointer">
            {credits} Credits
          </Badge>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Buy Credits</DialogTitle>
            <DialogDescription>
              <form onSubmit={handleSubmit}>
                <Input
                  type="range"
                  min={10}
                  max={150}
                  step={5}
                  value={quantity}
                  onChange={(e) => {
                    setQuantity(Number(e.currentTarget.value));
                  }}
                />
                <Button type="submit">Buy</Button>
              </form>
              <DialogDescription>{quantity}</DialogDescription>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default CreditsModal;
