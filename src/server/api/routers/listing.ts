import { z } from "zod";

import { createTRPCRouter, publicProcedure, protectedProcedure } from "../trpc";
import moment from "moment";

export const ListingRouter = createTRPCRouter({
  create: protectedProcedure
    .input(
      z.object({
        hostId: z.string(),
        name: z.string(),
        address: z.string(),
        priceLongTerm: z.number(),
        priceShortTerm: z.number(),
        gallery: z.string(),
        desc: z.string(),
        beds: z.number(),
        bedsrooms: z.number(),
        bathrooms: z.number(),
        guests: z.number(),
        active: z.boolean(),
        detail: z.string(),
        placeId: z.string(),
        approved: z.boolean(),
        latitude: z.number(),
        longitude: z.number(),
      })
    )
    .mutation(({ ctx, input }) => {
      return ctx.prisma.listing.create({ data: { ...input } });
    }),

  update: protectedProcedure
    .input(
      z.object({
        id: z.string(),
        name: z.string().optional(),
        address: z.string().optional(),
        priceLongTerm: z.number().optional(),
        priceShortTerm: z.number().optional(),
        gallery: z.string().optional(),
        approved: z.boolean().optional(),
        desc: z.string().optional(),
        beds: z.number().optional(),
        bedsrooms: z.number().optional(),
        bathrooms: z.number().optional(),
        guests: z.number().optional(),
        active: z.boolean().optional(),
        detail: z.string().optional(),
        placeId: z.string().optional(),
        latitude: z.number(),
        longitude: z.number(),
      })
    )
    .mutation(({ input, ctx }) => {
      return ctx.prisma.listing.update({
        where: { id: input.id },
        data: input,
      });
    }),

  getAllListing: publicProcedure
    .input(
      z.object({
        totalGuests: z.number().optional(),
        checkInDate: z.date().optional(),
        checkOutDate: z.date().optional(),
        latitude: z.number().optional(),
        longitude: z.number().optional(),
      })
    )
    .query(
      async ({
        ctx,
        input: { checkInDate, checkOutDate, latitude, longitude, totalGuests },
      }) => {
        const data = await ctx.prisma.listing.findMany({
          where: {
            active: true,
            guests: {
              gte: totalGuests,
            },
            latitude,
            longitude,
          },
          include: {
            booking: {
              select: {
                checkIn: true,
                checkOut: true,
              },
            },
          },
        });

        return data.filter((item) => {
          const bookingList = item.booking.map(({ checkIn, checkOut }) => ({
            checkIn: moment(checkIn),
            checkOut: moment(checkOut),
          }));

          // -- -> --

          return !bookingList.some(
            ({ checkIn, checkOut }) =>
              (checkIn.isSameOrAfter(checkInDate) &&
                checkIn.isSameOrBefore(checkOutDate)) ||
              (checkOut.isSameOrAfter(checkInDate) &&
                checkOut.isSameOrBefore(checkOutDate))
          );
        });
      }
    ),

  getByHostId: protectedProcedure
    .input(
      z.object({
        hostId: z.string(),
      })
    )
    .query(({ input: { hostId }, ctx }) => {
      return ctx.prisma.listing.findMany({
        where: { hostId },
      });
    }),

  getListingById: publicProcedure
    .input(
      z.object({
        id: z.string(),
      })
    )
    .query(({ input: { id }, ctx }) => {
      return ctx.prisma.listing.findUnique({
        where: { id },
        include: { host: true },
      });
    }),

  getByHostIdAndNotApproved: protectedProcedure
    .input(
      z.object({
        hostId: z.string(),
      })
    )
    .query(({ input: { hostId }, ctx }) => {
      return ctx.prisma.listing.findMany({
        where: { hostId, approved: false },
      });
    }),
});
