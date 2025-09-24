import { useMutation, useQueryClient } from '@tanstack/react-query'
import { TransactionType } from '@/shared/types'
import { keys } from '@/shared/constants/key'
import { api } from '@/shared/lib/api-client'

export const updateCategory = (body: {
	name: string
	color: string
	parentId: string | null
	type: TransactionType
	id: string
}) => {
	return api.patch(`category/${body.id}`, { json: body }).json()
}

export const useUpdateCategory = () => {
	const queryClient = useQueryClient()

	return useMutation({
		mutationFn: updateCategory,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: [keys.Category] })
		},
	})
}
