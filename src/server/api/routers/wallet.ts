import { create, destroy, readAll, update } from '~/features/wallet/api'
import { createTRPCRouter } from '../trpc'

export const walletRouter = createTRPCRouter({
  readAll,
  create,
  update,
  destroy,
})
