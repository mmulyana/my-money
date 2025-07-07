import { z } from 'zod'

import { protectedProcedure } from '@/trpc/helper'

import { CategorySchema, dateRangeInput } from '../schema'

export const readAll = protectedProcedure.query(async ({ ctx }) => {
  const data = await ctx.db.category.findMany({
    where: {
      OR: [{ createdBy: ctx.session?.user.id }, { createdBy: null }],
    },
  })

  return data ?? []
})
export const create = protectedProcedure
  .input(CategorySchema)
  .mutation(async ({ ctx, input }) => {
    const newCategory = await ctx.db.category.create({
      data: { ...input, createdBy: ctx.user.id },
    })
    return newCategory
  })
export const update = protectedProcedure
  .input(CategorySchema.extend({ id: z.string() }))
  .mutation(async ({ ctx, input }) => {
    const category = await ctx.db.category.update({
      data: { ...input },
      where: { id: input.id },
    })
    return category
  })
export const summaryByCategory = protectedProcedure
  .input(dateRangeInput)
  .query(async ({ ctx, input }) => {
    const { startDate, endDate } = input
    const userId = ctx.session.user.id

    const transactions = await ctx.db.transaction.findMany({
      where: {
        createdBy: userId,
        date: {
          gte: startDate,
          lte: endDate,
        },
      },
      include: {
        category: true,
      },
    })

    const categoryMap = new Map<
      string,
      {
        id: string
        name: string
        color: string
        amount: number
        type: 'INCOME' | 'EXPENSE'
        icon: string
      }
    >()

    for (const tx of transactions) {
      const category = tx.category
      if (!category) continue

      if (!categoryMap.has(category.id)) {
        categoryMap.set(category.id, {
          id: category.id,
          name: category.name,
          color: category.color,
          amount: 0,
          type: category.type ?? tx.type,
          icon: category.icon as string,
        })
      }

      const cat = categoryMap.get(category.id)!
      cat.amount += tx.amount
    }

    let totalIncome = 0
    let totalExpense = 0

    for (const cat of categoryMap.values()) {
      if (cat.type === 'INCOME') {
        totalIncome += cat.amount
      } else if (cat.type === 'EXPENSE') {
        totalExpense += cat.amount
      }
    }

    // Hitung persentase
    const categories = Array.from(categoryMap.values()).map((cat) => ({
      ...cat,
      percentage:
        cat.type === 'EXPENSE' && totalExpense > 0
          ? (cat.amount / totalExpense) * 100
          : cat.type === 'INCOME' && totalIncome > 0
            ? (cat.amount / totalIncome) * 100
            : 0,
    }))

    return {
      totalIncome,
      totalExpense,
      categories,
    }
  })
