import { z } from 'zod'
import { updateTotalWallet } from '@/features/wallet/helper'
import { protectedProcedure } from '@/trpc/helper'
import { transactionSchema } from '../schema'

export const create = protectedProcedure
  .input(transactionSchema)
  .mutation(async ({ ctx, input }) => {
    const transaction = await ctx.db.transaction.create({
      data: {
        ...input,
        createdBy: ctx.session.user.id,
      },
    })
    if (transaction.date) {
      await updateTotalWallet(ctx.db, transaction.walletId, transaction.date)
    }
    return transaction
  })
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
      date: 'desc',
    },
  })

  return transactions ?? []
})
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
    })

    return data
  })
export const destroy = protectedProcedure
  .input(z.object({ id: z.string() }))
  .mutation(async ({ ctx, input }) => {
    const transaction = await ctx.db.transaction.delete({
      where: { id: input.id },
    })
    if (transaction.date) {
      await updateTotalWallet(ctx.db, transaction.walletId, transaction.date)
    }
    return transaction
  })
export const update = protectedProcedure
  .input(transactionSchema.extend({ id: z.string() }))
  .mutation(async ({ ctx, input }) => {
    const { id, ...rest } = input
    const transaction = await ctx.db.transaction.update({
      where: { id },
      data: rest,
    })
    if (transaction.date) {
      await updateTotalWallet(ctx.db, transaction.walletId, transaction.date)
    }
    return transaction
  })
