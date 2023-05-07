import { z } from "zod";

import { createTRPCRouter, protectedProcedure, publicProcedure } from "../trpc";

export const ReviewRouter = createTRPCRouter({
  create: protectedProcedure
    .input(
      z.object({
        // id: z.string(),

        bookingId: z.string().optional(),

        guestId: z.string(),

        listingId: z.string(),

        rating: z.number(),

        comment: z.string(),

        isReview: z.boolean().optional(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      await ctx.prisma.booking.update({
        where: { id: input.bookingId },
        data: { isReview: input.isReview },
      });

      delete input.isReview;
      delete input.bookingId;

      return ctx.prisma.review.create({ data: { ...input } });
    }),

  getReviewByListingId: publicProcedure
    .input(
      z.object({
        listingId: z.string(),
      })
    )
    .query(({ input: { listingId }, ctx }) => {
      return ctx.prisma.review.findMany({
        where: { listingId },
        include: { guests: true },
      });
    }),
});
