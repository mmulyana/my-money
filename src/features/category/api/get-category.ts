import { useQuery } from '@tanstack/react-query'

import { Api, Pagination, TransactionType } from '@/shared/types'
import { keys } from '@/shared/constants/key'
import { api } from '@/shared/lib/api-client'
import { Category } from '../types'

type Param = {
	pagination?: Pagination
	parentId?: string
	type?: TransactionType
}

export const getCategory = (param?: Param) => {
	const { pagination, parentId, type } = param || {}

	return api
		.get<Api<Category[]>>('category', {
			searchParams: {
				page: pagination?.page,
				limit: pagination?.limit,
				parentId,
				type,
			},
		})
		.json()
}

export const useGetCategories = (params?: Param) => {
	return useQuery({
		queryFn: () => getCategory(params),
		queryKey: [keys.Category, params],
	})
}
