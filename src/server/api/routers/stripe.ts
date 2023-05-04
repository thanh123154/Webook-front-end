import { z } from "zod";

import { createTRPCRouter, protectedProcedure } from "../../../server/api/trpc";

export const stripeRouter = createTRPCRouter({
  checkoutSession: protectedProcedure
    .input(
      z.object({
        productName: z.string(),
        amount: z.number(),
      })
    )
    .mutation(async ({ input: { amount, productName }, ctx: { req, stripe } }) => {
      return await stripe.checkout.sessions.create({
        submit_type: "pay",
        mode: "payment",
        payment_method_types: ["card"],
        line_items: [
          {
            quantity: 1,
            price_data: {
              product_data: {
                name: productName,
              },
              unit_amount: amount,
              currency: "VND",
            },
          },
        ],
        success_url: `${req.headers.origin || ""}/checkout`,
        cancel_url: `${req.headers.origin || ""}`,
      });
    }),
});
