import { create, destroy, readAll } from '@/features/budget/api'
import { createTRPCRouter } from '../trpc'

export const budgetRouter = createTRPCRouter({
  readAll,
  create,
  destroy,
})
