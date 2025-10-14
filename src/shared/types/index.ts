export type Api<T> = {
	message: string
	success: boolean
	data: T
	meta?: {
		total?: number
		page?: number | null
		limit?: number | null
		pageCount?: number
		cursor?: number | null
		count?: number
		hasMore?: boolean
	}
}

export type Pagination = {
	page?: number
	limit?: number
	cursor?: string
}

export type ApiError = {
	message: string
	error: any | string
	statusCode: number
}

export type TransactionType = 'expense' | 'income' | 'transfer'

export type User = {
	id: string
	username: string
	email?: string | null
	isGuest: boolean
	photoUrl?: string | null
	createdAt: string
	updatedAt: string
}
