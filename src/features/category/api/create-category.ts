import { useMutation, useQueryClient } from '@tanstack/react-query'
import { TransactionType } from '@/shared/types'
import { keys } from '@/shared/constants/key'
import { api } from '@/shared/lib/api-client'

export const createCategory = (body: {
	name: string
	color: string
	parentId: string | null
	type: TransactionType
}) => {
	return api.post('category', { json: body }).json()
}

export const useCreateCategory = () => {
	const queryClient = useQueryClient()

	return useMutation({
		mutationFn: createCategory,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: [keys.Category] })
		},
	})
}
