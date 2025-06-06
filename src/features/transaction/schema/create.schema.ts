import { z } from 'zod'

export const transactionSchema = z.object({
	amount: z.coerce.number().min(1, 'Amount must be at least 1'),
	type: z.enum(['INCOME', 'EXPENSE']),
	note: z.string().optional(),
	date: z.coerce.date(),
	categoryId: z.string().nullable().optional(),
	walletId: z.string().nullable().optional(),
})

export type TransactionInput = z.infer<typeof transactionSchema>
