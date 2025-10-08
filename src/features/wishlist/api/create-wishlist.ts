import { useMutation, useQueryClient } from '@tanstack/react-query'
import { keys } from '@/shared/constants/key'
import { api } from '@/shared/lib/api-client'

export const useCreateWishlist = () => {
	const queryClient = useQueryClient()

	return useMutation({
		mutationFn: (body: {}) => {
			return api.post('wishlist', { json: body }).json()
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: [keys.Wishlist] })
		},
	})
}
