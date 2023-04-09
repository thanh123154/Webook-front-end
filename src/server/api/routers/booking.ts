import { z } from "zod";

import { createTRPCRouter, publicProcedure, protectedProcedure } from "../trpc";

export const BookingRouter = createTRPCRouter({
  create: protectedProcedure
    .input(
      z.object({
        guestId: z.string(),
        listingId: z.string(),
        checkIn: z.date(),
        checkOut: z.date(),
        total: z.number(),
        guest: z.number(),
        isDenied: z.boolean(),
        rating: z.number(),
        phoneNumber: z.string(),
        review: z.string(),
      })
    )
    .mutation(({ ctx, input }) => {
      return ctx.prisma.booking.create({ data: { ...input } });
    }),

  getByHostId: protectedProcedure
    .input(
      z.object({
        guestId: z.string(),
      })
    )
    .query(({ input: { guestId }, ctx }) => {
      return ctx.prisma.booking.findMany({
        where: { guestId },
        include: { guests: true, booked: true },
      });
    }),

  aproveBooking: protectedProcedure
    .input(
      z.object({
        id: z.string(),
        isDenied: z.boolean().optional(),
      })
    )
    .mutation(({ input, ctx }) => {
      return ctx.prisma.booking.update({
        where: { id: input.id },
        data: input,
      });
    }),
});
