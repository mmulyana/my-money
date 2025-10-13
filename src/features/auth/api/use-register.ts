import { useMutation } from '@tanstack/react-query'
import { jwtDecode, JwtPayload } from 'jwt-decode'
import Cookies from 'js-cookie'
import { HTTPError } from 'ky'
import { toast } from 'sonner'

import { api } from '@/shared/lib/api-client'
import { Api, ApiError } from '@/shared/types'

export const useRegister = () => {
	return useMutation({
		mutationFn: (body: {
			email?: string
			username?: string
			password: string
		}) => {
			return api
				.post<Api<{ access_token: string }>>('auth/register', { json: body })
				.json()
		},
		onSuccess: (data) => {
			const token = data.data.access_token
			const decoded = jwtDecode<JwtPayload>(token)

			if (decoded.exp) {
				Cookies.set('access_token', token, {
					expires: (decoded.exp - Date.now() / 1000) / 86400,
					path: '/',
					sameSite: 'strict',
				})
			}
		},
		onError: async (error) => {
			if (error instanceof HTTPError) {
				const err = await error.response.json<ApiError>()
				toast.error(err.message)
			}
		},
	})
}
