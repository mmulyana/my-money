import { protectedProcedure } from '@/trpc/helper'
import { BudgetSchema } from '../schema'
import { z } from 'zod'

export const readAll = protectedProcedure.query(async ({ ctx }) => {
  const budgets = await ctx.db.budget.findMany({
    where: {
      createdBy: ctx.user.id,
    },
    include: {
      category: true,
    },
  })

  const budgetsWithStats = await Promise.all(
    budgets.map(async (budget) => {
      const totalTransaction = await ctx.db.transaction.aggregate({
        _sum: {
          amount: true,
        },
        where: {
          categoryId: budget.categoryId,
          createdBy: ctx.user.id,
          date: {
            gte: budget.startDate,
            lte: budget.endDate,
          },
        },
      })

      const usedAmount = totalTransaction._sum.amount || 0
      const remaining = budget.amount - usedAmount
      const percentage =
        budget.amount > 0 ? (usedAmount / budget.amount) * 100 : 0

      return {
        ...budget,
        usedAmount,
        remaining,
        percentage: Math.min(percentage, 100),
      }
    }),
  )

  return budgetsWithStats
})
export const create = protectedProcedure
  .input(BudgetSchema)
  .mutation(async ({ ctx, input }) => {
    const newBudget = await ctx.db.budget.create({
      data: {
        ...input,
        createdBy: ctx.user.id,
      },
    })
    return newBudget
  })
  
export const update = protectedProcedure
  .input(BudgetSchema.extend({ id: z.string() }))
  .mutation(async ({ ctx, input }) => {
    return ctx.db.budget.update({
      data: {
        ...input,
        createdBy: ctx.user.id,
      },
      where: { id: input.id },
    })
  })

export const destroy = protectedProcedure
  .input(
    z.object({
      id: z.string(),
    }),
  )
  .mutation(async ({ ctx, input }) => {
    return ctx.db.budget.delete({ where: { id: input.id } })
  })
export const read = protectedProcedure
  .input(z.object({ id: z.string() }))
  .query(async ({ ctx, input }) =>
    ctx.db.budget.findUnique({ where: { id: input.id } }),
  )
