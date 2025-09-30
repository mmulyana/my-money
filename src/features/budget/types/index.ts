export type budgetForm = {
	name: string
	walletId: string
	startDate: string
	endDate: string
	total: number
	categories: {
		category_id: string
		total: number
		label: string
		color: string
	}[]
}
