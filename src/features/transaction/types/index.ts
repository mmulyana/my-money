import { Category } from '@/features/category/types'
import { Wallet } from '@/features/wallet/types'
import { TransactionType } from '@/shared/types'

export type Transaction = {
	id: string
	categoryId: string
	walletId: string
	amount: number
	type: TransactionType
	date: string
	remark?: string

	createdAt: string
	updatedAt: string
	deletedAt: null | string

	category: Category
	wallet: Wallet
}

export type TransactionGroup = {
	date: string
	total: number
	transactions: Transaction[]
}
