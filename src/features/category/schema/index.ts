import { z } from 'zod'

export const CategorySchema = z.object({
  name: z.string().min(1),
  color: z.string(),
  icon: z.string().optional(),
  type: z.enum(['EXPENSE', 'INCOME']),
})

export type Category = z.infer<typeof CategorySchema>

export const dateRangeInput = z.object({
  startDate: z.date(),
  endDate: z.date(),
})
