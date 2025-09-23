import { useEffect, useState } from 'react'

export const useIsMobile = (breakpoint: number = 768): boolean => {
	const [isMobile, setIsMobile] = useState<boolean>(() => {
		if (typeof window === 'undefined') return false
		return window.matchMedia(`(max-width: ${breakpoint}px)`).matches
	})

	useEffect(() => {
		if (typeof window === 'undefined') return

		const mediaQuery = window.matchMedia(`(max-width: ${breakpoint}px)`)

		const handler = (event: MediaQueryListEvent) => {
			setIsMobile(event.matches)
		}

		if (mediaQuery.addEventListener) {
			mediaQuery.addEventListener('change', handler)
		} else {
			mediaQuery.addListener(handler)
		}

		return () => {
			if (mediaQuery.removeEventListener) {
				mediaQuery.removeEventListener('change', handler)
			} else {
				mediaQuery.removeListener(handler)
			}
		}
	}, [breakpoint])

	return isMobile
}
