import { api } from '@/shared/lib/api-client'
import { Api } from '@/shared/types'

export const useOauth = () => {
	const onGoogleOauth = async () => {
		const res = await api
			.get<Api<{ url: string }>>('auth/google/url', {})
			.json()
		return res.data.url
	}

	return {
		onGoogleOauth,
	}
}
