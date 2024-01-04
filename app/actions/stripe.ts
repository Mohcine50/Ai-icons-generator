"use server";

import getStripe from "@/lib/get-stripejs";

export const createCheckoutSession = async () => {
  const stripe = await getStripe();
  console.log(stripe);
};
