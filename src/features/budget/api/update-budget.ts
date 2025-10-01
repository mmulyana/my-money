import { useMutation, useQueryClient } from '@tanstack/react-query'
import { keys } from '@/shared/constants/key'
import { api } from '@/shared/lib/api-client'
import { budgetForm } from '../types'

export const updateBudget = (body: Partial<budgetForm> & { id: string }) => {
	return api.patch(`budget/${body.id}`, { json: body }).json()
}

export const useUpdateBudget = () => {
	const queryClient = useQueryClient()

	return useMutation({
		mutationFn: updateBudget,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: [keys.Budget] })
		},
	})
}
