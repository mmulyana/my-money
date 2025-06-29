import { protectedProcedure } from "~/trpc/helper";
import { transactionSchema } from "../schema";
import { z } from "zod";

export const create = protectedProcedure
  .input(transactionSchema)
  .mutation(async ({ ctx, input }) => {
    return ctx.db.transaction.create({
      data: {
        ...input,
        createdBy: ctx.session.user.id,
      },
    });
  });
export const readAll = protectedProcedure.query(async ({ ctx }) => {
  const transactions = await ctx.db.transaction.findMany({
    where: {
      createdBy: ctx.session?.user.id,
    },
    include: {
      category: true,
      user: {
        select: {
          name: true,
        },
      },
    },
    orderBy: {
      date: "desc",
    },
  });

  return transactions ?? [];
});
export const read = protectedProcedure
  .input(z.object({ id: z.string() }))
  .query(async ({ ctx, input }) => {
    const data = await ctx.db.transaction.findUnique({
      where: {
        id: input.id,
      },
      include: {
        category: true,
      },
    });

    return data;
  });
export const destroy = protectedProcedure
  .input(z.object({ id: z.string() }))
  .mutation(async ({ ctx, input }) => {
    return ctx.db.transaction.delete({
      where: { id: input.id },
    });
  });
export const update = protectedProcedure
  .input(transactionSchema.extend({ id: z.string() }))
  .mutation(async ({ ctx, input }) => {
    const { id, ...rest } = input;
    return ctx.db.transaction.update({
      where: { id },
      data: rest,
    });
  });
