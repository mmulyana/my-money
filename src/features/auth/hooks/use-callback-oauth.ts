'use client'

import { jwtDecode, JwtPayload } from 'jwt-decode'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import Cookies from 'js-cookie'

import { useQueryUrl } from '@/shared/hooks/use-query-url'

export function useCallbackOauth() {
	const token = useQueryUrl('token')
	const router = useRouter()

	useEffect(() => {
		if (typeof token == 'string') {
			const decoded = jwtDecode<JwtPayload>(token)

			if (decoded.exp) {
				Cookies.set('access_token', token, {
					expires: (decoded.exp - Date.now() / 1000) / 86400,
					path: '/',
					sameSite: 'strict',
				})
				router.replace('/app')
			}
		}
	}, [token])
}
