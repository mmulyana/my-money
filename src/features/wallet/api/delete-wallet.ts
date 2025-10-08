import { useMutation, useQueryClient } from '@tanstack/react-query'
import { keys } from '@/shared/constants/key'
import { api } from '@/shared/lib/api-client'

export const useDeleteWallet = () => {
	const queryClient = useQueryClient()

	return useMutation({
		mutationFn: (body: { id: string }) => {
			return api.delete(`wallet/${body.id}`)
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: [keys.Wallet] })
			queryClient.invalidateQueries({ queryKey: [keys.Transaction] })
			queryClient.invalidateQueries({ queryKey: [keys.Budget] })
		},
	})
}
