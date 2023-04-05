import { z } from "zod";

import { createTRPCRouter, publicProcedure, protectedProcedure } from "../trpc";

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
        province: z.string(),
        district: z.string(),
        ward: z.string(),
        approved: z.boolean(),
      })
    )
    .mutation(({ ctx, input }) => {
      const destination = `${input.address}, ${input.ward}, ${input.district}, ${input.province}`;

      return ctx.prisma.listing.create({ data: { ...input, destination } });
    }),

  update: protectedProcedure
    .input(
      z.object({
        id: z.string(),
        // hostId: z.string(),
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
        province: z.string().optional(),
        district: z.string().optional(),
        ward: z.string().optional(),
      })
    )
    .mutation(({ input, ctx }) => {
      return ctx.prisma.listing.update({
        where: { id: input.id },
        data: input,
      });
    }),

  getAllListing: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.listing.findMany({});
  }),

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
