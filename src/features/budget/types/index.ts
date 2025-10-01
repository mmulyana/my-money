import { Category } from '@/features/category/types'

export type budgetForm = {
	name: string
	total: number
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
	walletId: string
	items: BudgetItem[]
	remaining: number
	usage: number
	categories: Categories[]
}

export type BudgetItem = {
	id: string
	categoryId: string
	budgetId: string
	planned: number
	actual: number
	category: Category
}

export type Categories = {
	category: Category
	planned: number
	actual: number
	progress: number
	id: string
}
