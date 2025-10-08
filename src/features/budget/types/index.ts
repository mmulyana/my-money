import { Category } from '@/features/category/types'
import { Wallet } from '@/features/wallet/types'

export type budgetForm = {
	name: string
	total: number | string
	walletId: string
	startAt: string
	endAt: string
	categories: {
		categoryId: string
		planned: number
		name: string
		color: string
		imageUrl?: string
	}[]
}

export type Budget = {
	id: string
	name: string
	startAt: string
	endAt: string
	total: number
	wallet: Wallet
	spent: number
	remaining: number
	usage: number
	categories: Categories[]
}

export type Categories = {
	category: Category
	planned: number
	actual: number
	progress: number
	id: string
}
