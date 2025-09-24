import { useMutation, useQueryClient } from '@tanstack/react-query'
import { keys } from '@/shared/constants/key'
import { api } from '@/shared/lib/api-client'

export const createWallet = (body: { name: string; color: string }) => {
	return api.post('wallet', { json: body })
}

export const useCreateWallet = () => {
	const queryClient = useQueryClient()

	return useMutation({
		mutationFn: createWallet,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: [keys.Wallet] })
		},
	})
}
