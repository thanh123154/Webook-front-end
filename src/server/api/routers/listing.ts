import { z } from "zod";

import { createTRPCRouter, publicProcedure, protectedProcedure } from "../trpc";

export const ListingRouter = createTRPCRouter({
  create: protectedProcedure
    .input(
      z.object({
        hostId: z.string(),
        name: z.string(),
        address: z.string(),
        price: z.number(),
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
      })
    )
    .mutation(({ ctx, input }) => {
      const destination = `${input.address}, ${input.ward}, ${input.district}, ${input.province}`;

      return ctx.prisma.listing.create({ data: { ...input, destination } });
    }),

  getAllListing: protectedProcedure
    .input(
      z.object({
        destination: z.string().optional(),
      })
    )
    .query(({ ctx, input: { destination } }) => {
      return ctx.prisma.listing.findMany({
        where: {
          destination: { contains: destination },
        },
      });
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
});
