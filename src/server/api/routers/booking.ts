import { z } from "zod";

import { createTRPCRouter, protectedProcedure } from "../trpc";
import { nanoid } from "nanoid";

export const BookingRouter = createTRPCRouter({
  prepaid: protectedProcedure
    .input(
      z.object({
        guestId: z.string(),
        listingId: z.string(),
        checkIn: z.date(),
        checkOut: z.date(),
        total: z.number(),
        guest: z.number(),
        phoneNumber: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const id = nanoid();

      await ctx.prisma.prepaidBooking.create({
        data: {
          id,
          ...input,
        },
      });

      return id;
    }),

  create: protectedProcedure
    .input(
      z.object({
        prepaidId: z.string(),
      })
    )
    .mutation(async ({ ctx, input: { prepaidId } }) => {
      const dataPrepaid = await ctx.prisma.prepaidBooking.findUnique({
        where: { id: prepaidId },
      });

      if (!!dataPrepaid) {
        await ctx.prisma.prepaidBooking.delete({ where: { id: prepaidId } });

        return ctx.prisma.booking.create({
          data: { ...dataPrepaid, isDenied: false },
        });
      } else {
        throw "Prepaid booking not found!";
      }
    }),

  getCurrentBookingByHostId: protectedProcedure
    .input(
      z.object({
        guestId: z.string(),
      })
    )
    .query(({ input: { guestId }, ctx }) => {
      return ctx.prisma.booking.findMany({
        where: {
          booked: {
            hostId: guestId,
          },
          checkIn: {
            gte: new Date(),
          },
        },
        include: { guests: true, booked: true },
      });
    }),

  getHistoryBookingByHostId: protectedProcedure
    .input(
      z.object({
        guestId: z.string(),
      })
    )
    .query(({ input: { guestId }, ctx }) => {
      return ctx.prisma.booking.findMany({
        where: {
          guestId,
          checkOut: {
            lt: new Date(),
          },
        },
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

  updateIsReview: protectedProcedure
    .input(
      z.object({
        id: z.string(),
        isReview: z.boolean().optional(),
      })
    )
    .mutation(({ input, ctx }) => {
      return ctx.prisma.booking.update({
        where: { id: input.id },
        data: input,
      });
    }),
});
