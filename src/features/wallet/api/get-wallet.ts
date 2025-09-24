import { useQuery } from '@tanstack/react-query'
import { Api, Pagination } from '@/shared/types'
import { keys } from '@/shared/constants/key'
import { api } from '@/shared/lib/api-client'

import { Wallet } from '../types'

export const getWallet = ({ pagination }: { pagination?: Pagination }) => {
	return api.get<Api<Wallet[]>>('wallet', { searchParams: pagination }).json()
}

export const useGetWallet = ({ pagination }: { pagination?: Pagination }) => {
	return useQuery({
		queryFn: () => getWallet({ pagination }),
		queryKey: [keys.Wallet, pagination],
	})
}
