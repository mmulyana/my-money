import { useMutation, useQueryClient } from '@tanstack/react-query'
import { api } from '@/shared/lib/api-client'
import { keys } from '@/shared/constants/key'

import { TransactionForm } from '../types/form'

export const createTransaction = (body: TransactionForm) => {
	return api.post('transaction', { json: body })
}

export const useCreateTransaction = () => {
	const queryClient = useQueryClient()

	return useMutation({
		mutationFn: createTransaction,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: [keys.Transaction] })
			queryClient.invalidateQueries({ queryKey: [keys.Wallet] })
			queryClient.invalidateQueries({ queryKey: [keys.Budget] })
		},
	})
}
