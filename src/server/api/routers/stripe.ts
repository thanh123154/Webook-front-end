import { z } from "zod";

import { createTRPCRouter, protectedProcedure } from "../../../server/api/trpc";
import { nanoid } from "nanoid";

export const stripeRouter = createTRPCRouter({
  checkoutSession: protectedProcedure
    .input(
      z.object({
        productName: z.string(),
        amount: z.number(),
        cancelPath: z.string().optional(),
        bookingId: z.string(),
      })
    )
    .mutation(
      async ({
        input: { amount, productName, cancelPath = "", bookingId },
        ctx: { req, stripe },
      }) => {
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
          success_url: `${req.headers.origin || ""}/checkout?code=${bookingId}`,
          cancel_url: `${req.headers.origin || ""}${cancelPath}`,
        });
      }
    ),
});
