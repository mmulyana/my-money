import { TransactionType } from '@/shared/types'

export type TransactionForm = {
	amount: number
	walletId: string
	categoryId: string
	type: TransactionType
	date: string
	toWalletId?: string | null
	remark?: string
}
