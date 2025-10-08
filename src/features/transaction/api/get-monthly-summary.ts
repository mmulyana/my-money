import { useQuery } from '@tanstack/react-query'
import { keys } from '@/shared/constants/key'
import { api } from '@/shared/lib/api-client'
import { Api } from '@/shared/types'

type Params = {
	month?: number
	year?: number
	enabled?: boolean
}

export const useGetMonthlySummary = (params?: Params) => {
	return useQuery({
		queryFn: () => {
			const { month, year } = params || {}
			return api
				.get<Api<{ balance: number; income: number; expense: number }>>(
					'transaction/monthly-summary',
					{
						searchParams: {
							month,
							year,
						},
					}
				)
				.json()
		},
		queryKey: [keys.MonthlySummary, params],
		enabled: params?.enabled || false,
	})
}
