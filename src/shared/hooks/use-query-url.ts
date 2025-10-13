'use client'

import { useSearchParams } from 'next/navigation'
import { useMemo } from 'react'

export function useQueryUrl(key: string): string | string[] | null {
	const searchParams = useSearchParams()

	return useMemo(() => {
		if (!searchParams) return null

		const allValues = searchParams.getAll(key)

		if (allValues.length === 0) return null
		if (allValues.length === 1) return allValues[0]

		return allValues
	}, [searchParams, key])
}
