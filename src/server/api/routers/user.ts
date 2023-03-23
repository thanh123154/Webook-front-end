import { z } from "zod";

import { createTRPCRouter, publicProcedure, protectedProcedure } from "../trpc";

export const userRouter = createTRPCRouter({
  getAll: protectedProcedure.input(z.object({})).query(({ ctx }) => {
    return ctx.prisma.user.findMany({
      include: {
        listings: {
          include: {
            booking: true,
          },
        },
      },
    });
  }),

  getById: protectedProcedure
    .input(
      z.object({
        id: z.string(),
      })
    )
    .query(({ input: { id }, ctx }) => {
      return ctx.prisma.user.findUnique({
        where: { id },
      });
    }),

  create: protectedProcedure
    .input(
      z.object({
        name: z.string(),
      })
    )
    .mutation(({ input, ctx }) => {
      return ctx.prisma.user.create({
        data: input,
      });
    }),

  update: protectedProcedure
    .input(
      z.object({
        id: z.string(),
        name: z.string().optional(),
        email: z.string().email().optional(),
      })
    )
    .mutation(({ input, ctx }) => {
      return ctx.prisma.user.update({
        where: { id: input.id },
        data: input,
      });
    }),

  delete: protectedProcedure
    .input(
      z.object({
        id: z.string(),
      })
    )
    .mutation(({ input: { id }, ctx }) => {
      return ctx.prisma.user.delete({
        where: { id },
      });
    }),
});
