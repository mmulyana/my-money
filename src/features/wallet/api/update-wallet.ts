import { useMutation, useQueryClient } from '@tanstack/react-query'
import { keys } from '@/shared/constants/key'
import { api } from '@/shared/lib/api-client'

export const useUpdateWallet = () => {
	const queryClient = useQueryClient()

	return useMutation({
		mutationFn: (body: { name: string; color: string; id: string }) => {
			return api.patch(`wallet/${body.id}`, { json: body })
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: [keys.Wallet] })
		},
	})
}
