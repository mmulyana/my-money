import { z } from 'zod'

export const BudgetSchema = z.object({
  categoryId: z.string().min(1),
  startDate: z.coerce.date(),
  endDate: z.coerce.date(),
  amount: z.coerce.number().min(1),
})

export type Budget = z.infer<typeof BudgetSchema>
