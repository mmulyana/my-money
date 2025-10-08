import { useQuery } from '@tanstack/react-query'
import { keys } from '@/shared/constants/key'
import { api } from '@/shared/lib/api-client'
import { Api } from '@/shared/types'

type Params = {
	date?: string
	enabled?: boolean
}

export const useGetExpenseCategory = (params?: Params) => {
	return useQuery({
		queryFn: () => {
			const { date } = params || {}
			return api
				.get<
					Api<
						{
							id: string
							name: string
							color: string
							imageUrl: string
							total: number
							imageVariant: string
						}[]
					>
				>('transaction/expense-category', {
					searchParams: {
						date,
					},
				})
				.json()
		},
		queryKey: [keys.ExpenseCategory, params],
		enabled: params?.enabled || false,
	})
}
