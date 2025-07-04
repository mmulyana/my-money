import { protectedProcedure } from '@/trpc/helper'
import { BudgetSchema } from '../schema'

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
