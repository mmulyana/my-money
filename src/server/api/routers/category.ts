import {
  create,
  readAll,
  summaryByCategory,
  update,
} from '@/features/category/api'
import { createTRPCRouter } from '../trpc'

export const categoryRouter = createTRPCRouter({
  readAll,
  create,
  update,
  summaryByCategory,
})
