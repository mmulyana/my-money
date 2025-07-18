import { create, destroy, read, readAll, update } from '@/features/budget/api'
import { createTRPCRouter } from '../trpc'

export const budgetRouter = createTRPCRouter({
  readAll,
  create,
  destroy,
  read,
  update,
})
