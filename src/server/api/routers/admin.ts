import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "../trpc";

export const AdminRouter = createTRPCRouter({
  login: publicProcedure
    .input(
      z.object({
        username: z.string(),
        password: z.string(),
      })
    )
    .mutation(({ ctx, input: { username, password } }) => {
      return ctx.prisma.adminAccount.findFirstOrThrow({
        where: { username, password },
      });
    }),

  getAllUnapprovedListings: publicProcedure
    .input(
      z.object({
        name: z.string().optional(),
      })
    )
    .query(({ ctx, input: { name } }) => {
      return ctx.prisma.listing.findMany({
        where: {
          approved: false,
          name: {
            contains: name,
          },
          active: true,
        },
      });
    }),

  approveListing: publicProcedure
    .input(
      z.object({
        listingId: z.string(),
      })
    )
    .mutation(({ ctx, input: { listingId } }) => {
      return ctx.prisma.listing.update({
        where: { id: listingId },
        data: {
          approved: true,
        },
      });
    }),
});
