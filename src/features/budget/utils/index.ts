import { Category } from '@/features/category/types'

export function flatten(items: Category[], acc: Category[] = []): Category[] {
	for (const item of items) {
		acc.push(item)
		if (item.children) {
			flatten(item.children, acc)
		}
	}
	return acc
}
