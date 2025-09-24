import { useQuery } from '@tanstack/react-query'
import { Api, Pagination } from '@/shared/types'
import { keys } from '@/shared/constants/key'
import { api } from '@/shared/lib/api-client'

import { TransactionGroup } from '../types'

type Params = {
	pagination?: Pagination
	month?: number
	year?: number
}

export const getTransaction = (params?: Params) => {
	const { month, pagination, year } = params || {}
	return api
		.get<Api<TransactionGroup[]>>('transaction', {
			searchParams: {
				page: pagination?.page,
				limit: pagination?.limit,
				month,
				year,
			},
		})
		.json()
}

export const useGetTransaction = (params?: Params) => {
	return useQuery({
		queryFn: () => getTransaction(params),
		queryKey: [keys.Transaction, params],
	})
}
