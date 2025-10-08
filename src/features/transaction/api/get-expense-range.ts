import { useQuery } from '@tanstack/react-query'
import { keys } from '@/shared/constants/key'
import { api } from '@/shared/lib/api-client'
import { Api } from '@/shared/types'

type Params = {
	date?: string
	range?: string
	enabled?: boolean
}

export const useGetExpenseRange = (params?: Params) => {
	return useQuery({
		queryFn: () => {
			const { date, range } = params || {}
			return api
				.get<Api<any>>('transaction/expense-range', {
					searchParams: {
						date,
						range,
					},
				})
				.json()
		},
		queryKey: [keys.ExpenseRange, params],
		enabled: params?.enabled || false,
	})
}
