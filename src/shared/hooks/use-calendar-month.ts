'use client'

import { useState, useMemo } from 'react'

function useCalendarMonth() {
	const [currentDate, setCurrentDate] = useState(() => new Date())

	const month = useMemo(() => {
		return currentDate.toLocaleDateString('en-US', {
			month: 'short',
			year: 'numeric',
		})
	}, [currentDate])

	const next = () => {
		setCurrentDate((prev) => {
			const d = new Date(prev)
			d.setMonth(d.getMonth() + 1)
			return d
		})
	}

	const prev = () => {
		setCurrentDate((prev) => {
			const d = new Date(prev)
			d.setMonth(d.getMonth() - 1)
			return d
		})
	}

	return {
		month,
		next,
		prev,
		currentDate,
		monthIndex: currentDate.getMonth(),
		year: currentDate.getFullYear(),
	}
}

export default useCalendarMonth
