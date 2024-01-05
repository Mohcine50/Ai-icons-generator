"use server";

import type { Stripe } from "stripe";
import getStripe from "@/lib/get-stripejs";
import { stripe } from "@/lib/stripe";
import { redirect } from "next/navigation";
import { headers } from "next/headers";

export async function createCheckoutSession({
  quantity,
  userId,
}: {
  quantity: number;
  userId: string;
}) {
  try {
    const checkoutSession: Stripe.Checkout.Session =
      await stripe.checkout.sessions.create({
        metadata: {
          userId,
          credits: quantity,
        },
        mode: "payment",
        submit_type: "pay",
        line_items: [
          {
            quantity,
            price_data: {
              currency: "usd",
              product_data: {
                name: "Credits",
              },
              unit_amount: 0.1 * quantity * 50,
            },
          },
        ],
        success_url: `${headers().get("origin")}/generate`,
        cancel_url: `${headers().get("origin")}/generate`,
      });

    return { url: checkoutSession.url };
  } catch (error) {
    console.error("Error creating checkout session:", error);
    return { error: error };
  }
}
