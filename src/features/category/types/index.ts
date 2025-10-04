export type Category = {
	id: string
	name: string
	color: string
	parentId: string | null
	children: Category[]
	imageUrl: string | null
	imageVariant: string | null
}
