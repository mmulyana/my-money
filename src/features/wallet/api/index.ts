import { protectedProcedure } from '~/trpc/helper'
import { WalletSchema } from '../schema'
import { z } from 'zod'

export const create = protectedProcedure
  .input(WalletSchema)
  .mutation(async ({ ctx, input }) => {
    return await ctx.db.wallet.create({
      data: {
        name: input.name,
        createdBy: ctx.user.id,
      },
    })
  })
export const update = protectedProcedure
  .input(WalletSchema.extend({ id: z.string() }))
  .mutation(async ({ ctx, input }) => {
    return await ctx.db.wallet.update({
      data: {
        name: input.name,
        createdBy: ctx.user.id,
      },
      where: { id: input.id },
    })
  })
export const readAll = protectedProcedure.query(async ({ ctx, input }) => {
  const wallets = await ctx.db.wallet.findMany({
    where: {
      createdBy: ctx.user.id,
    },
  })

  return wallets
})
export const readAllWithTotal = protectedProcedure
  .input(
    z.object({
      month: z.number().min(1).max(12),
      year: z.number(),
    }),
  )
  .query(async ({ ctx, input }) => {
    const wallets = await ctx.db.wallet.findMany({
      where: {
        createdBy: ctx.user.id,
      },
      include: {
        total: {
          where: {
            month: input.month,
            year: input.year,
          },
        },
      },
    })

    return wallets
  })
export const destroy = protectedProcedure
  .input(z.object({ id: z.string() }))
  .mutation(async ({ ctx, input }) => {
    const transactions = await ctx.db.transaction.findMany({
      where: {
        walletId: input.id,
      },
    })
    if (transactions.length > 0) {
      await ctx.db.transaction.deleteMany({
        where: {
          walletId: input.id,
        },
      })
    }

    const wallets = await ctx.db.wallet.delete({
      where: {
        id: input.id,
      },
    })
    return wallets
  })
