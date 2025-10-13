import { useQuery } from '@tanstack/react-query'

import { keys } from '@/shared/constants/key'
import { api } from '@/shared/lib/api-client'
import { Api } from '@/shared/types'

export const getMe = async () => {
	return await api.get<Api<any>>('user/me').json()
}

export const useGetMe = () => {
	return useQuery({
		queryFn: () => getMe(),
		queryKey: [keys.Me],
	})
}
