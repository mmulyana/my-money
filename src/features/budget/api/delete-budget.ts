import { useMutation, useQueryClient } from '@tanstack/react-query'
import { keys } from '@/shared/constants/key'
import { api } from '@/shared/lib/api-client'

export const useDeleteBudget = () => {
	const queryClient = useQueryClient()

	return useMutation({
		mutationFn: (body: { id: string }) => {
			return api.delete(`budget/${body.id}`).json()
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: [keys.Budget] })
		},
	})
}
