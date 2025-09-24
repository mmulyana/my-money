import { useMutation, useQueryClient } from '@tanstack/react-query'
import { api } from '@/shared/lib/api-client'
import { keys } from '@/shared/constants/key'

import { TransactionForm } from '../types/form'

export const updateTransaction = (body: TransactionForm & { id: string }) => {
	return api.patch(`transaction/${body.id}`, { json: body })
}

export const useUpdateTransaction = () => {
	const queryClient = useQueryClient()

	return useMutation({
		mutationFn: updateTransaction,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: [keys.Transaction] })
			queryClient.invalidateQueries({ queryKey: [keys.Wallet] })
		},
	})
}
