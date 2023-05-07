import { z } from "zod";

import { createTRPCRouter, protectedProcedure } from "../trpc";

export const ReviewRouter = createTRPCRouter({
  create: protectedProcedure
    .input(
      z.object({
        guestId: z.string(),

        listingId: z.string(),

        rating: z.number(),

        comment: z.string(),
      })
    )
    .mutation(({ ctx, input }) => {
      return ctx.prisma.review.create({ data: { ...input } });
    }),
});
