import { useQuery } from '@tanstack/react-query'

import { Api, Pagination } from '@/shared/types'
import { keys } from '@/shared/constants/key'
import { api } from '@/shared/lib/api-client'

import { Budget } from '../types'

type Param = {
	pagination?: Pagination
	month: number
	year: number
}

export const getBudget = (param?: Param) => {
	const { pagination, year, month } = param || {}

	return api
		.get<Api<Budget[]>>('budget', {
			searchParams: {
				page: pagination?.page,
				limit: pagination?.limit,
				year,
				month,
			},
		})
		.json()
}

export const useGetBudget = (params?: Param) => {
	return useQuery({
		queryFn: () => getBudget(params),
		queryKey: [keys.Budget, params],
	})
}
