import { z } from 'zod'

export const WalletSchema = z.object({
  name: z.string(),
})

export type Wallet = z.infer<typeof WalletSchema>
