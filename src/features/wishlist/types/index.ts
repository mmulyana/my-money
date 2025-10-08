export type Wishlist = {
	id: string
	name: string
	deadlineAt: string
	description?: string | null
	doneAt?: string | null
	imageUrl?: string | null
	total: string
	createdAt: string
	transaction: any[]
	funded: string
	progress: number
}
