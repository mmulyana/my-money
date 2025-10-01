import { useMutation, useQueryClient } from '@tanstack/react-query'
import { keys } from '@/shared/constants/key'
import { api } from '@/shared/lib/api-client'
import { budgetForm } from '../types'

export const createBudget = (body: budgetForm) => {
	return api.post('budget', { json: body }).json()
}

export const useCreateBudget = () => {
	const queryClient = useQueryClient()

	return useMutation({
		mutationFn: createBudget,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: [keys.Budget] })
		},
	})
}
