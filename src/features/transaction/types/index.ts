export type Category = {
	name: string
	color: string
}

export type Transaction = {
	amount: number
	remark: string
	category: Category
}
