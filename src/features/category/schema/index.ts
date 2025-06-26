import { z } from 'zod'

export const CategorySchema = z.object({
  name: z.string(),
  color: z.string(),
})

export type Category = z.infer<typeof CategorySchema>
