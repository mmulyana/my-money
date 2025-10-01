import { useMutation, useQueryClient } from '@tanstack/react-query'
import { keys } from '@/shared/constants/key'
import { api } from '@/shared/lib/api-client'
import { toast } from 'sonner'
import ky, { HTTPError } from 'ky'
import { ApiError } from '@/shared/types'

export const useCreateBudgetItem = () => {
	const queryClient = useQueryClient()

	return useMutation({
		mutationFn: (body: {
			categoryId: string
			budgetId: string
			planned: number
		}) => {
			return api.post('budget/item', { json: body }).json()
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: [keys.Budget] })
		},
		onError: async (error) => {
			if (error instanceof HTTPError) {
				const err = await error.response.json<ApiError>()
				toast.error(err.message)
			}
		},
	})
}
