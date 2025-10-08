import { useMutation, useQueryClient } from '@tanstack/react-query'
import { keys } from '@/shared/constants/key'
import { api } from '@/shared/lib/api-client'
import { HTTPError } from 'ky'
import { ApiError } from '@/shared/types'
import { toast } from 'sonner'

type Body = {
	categoryId: string
	id: string
	planned: string | number
	budgetId: string
}

export const useUpdateBudgetItem = () => {
	const queryClient = useQueryClient()

	return useMutation({
		mutationFn: (body: Partial<Body> & { id: string }) => {
			return api.patch(`budget/item/${body.id}`, { json: body }).json()
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
