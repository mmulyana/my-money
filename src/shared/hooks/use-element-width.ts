import { useEffect, useRef, useState } from 'react'

type UseElementWidthReturn<T extends HTMLElement> = {
	ref: React.RefObject<T | null>
	width: number
}

export function useElementWidth<
	T extends HTMLElement = HTMLElement
>(): UseElementWidthReturn<T> {
	const ref = useRef<T | null>(null)
	const [width, setWidth] = useState(0)

	useEffect(() => {
		const el = ref.current
		if (!el || typeof ResizeObserver === 'undefined') return

		let frame: number | null = null

		const observer = new ResizeObserver((entries) => {
			const entry = entries[0]
			if (!entry) return

			const nextWidth = entry.contentRect.width

			if (frame) cancelAnimationFrame(frame)
			frame = requestAnimationFrame(() => {
				setWidth(nextWidth)
				frame = null
			})
		})

		observer.observe(el)
		setWidth(el.getBoundingClientRect().width)

		return () => {
			observer.disconnect()
			if (frame) cancelAnimationFrame(frame)
		}
	}, [])

	return { ref, width }
}
