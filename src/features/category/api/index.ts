import { protectedProcedure } from '~/trpc/helper'
import { CategorySchema } from '../schema'
import { z } from 'zod'

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
