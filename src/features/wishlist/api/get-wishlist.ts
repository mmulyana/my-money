import { useQuery } from '@tanstack/react-query'

import { Api, Pagination } from '@/shared/types'
import { keys } from '@/shared/constants/key'
import { api } from '@/shared/lib/api-client'
import { Wishlist } from '../types'

type Param = {
	pagination?: Pagination
	q?: string
}

export const getWishlist = (param?: Param) => {
	const { pagination, q } = param || {}

	return api
		.get<Api<Wishlist[]>>('wishlist', {
			searchParams: {
				page: pagination?.page,
				limit: pagination?.limit,
				q,
			},
		})
		.json()
}

export const useGetWishlist = (params?: Param) => {
	return useQuery({
		queryFn: () => getWishlist(params),
		queryKey: [keys.Wishlist, params],
	})
}
