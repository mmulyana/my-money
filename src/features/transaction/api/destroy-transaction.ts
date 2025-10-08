import { useMutation, useQueryClient } from '@tanstack/react-query'
import { api } from '@/shared/lib/api-client'
import { keys } from '@/shared/constants/key'

export const destroyTransaction = (body: { id: string }) => {
	return api.delete(`transaction/${body.id}`)
}

export const useDestroyTransaction = () => {
	const queryClient = useQueryClient()

	return useMutation({
		mutationFn: destroyTransaction,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: [keys.Transaction] })
			queryClient.invalidateQueries({ queryKey: [keys.Wallet] })
			queryClient.invalidateQueries({ queryKey: [keys.Budget] })
		},
	})
}
