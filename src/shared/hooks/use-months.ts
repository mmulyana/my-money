import { useMemo } from 'react'

type Language = 'en' | 'id'

export function useMonths(language: Language = 'en') {
	const months = useMemo(() => {
		const monthNames: Record<Language, string[]> = {
			en: [
				'January',
				'February',
				'March',
				'April',
				'May',
				'June',
				'July',
				'August',
				'September',
				'October',
				'November',
				'December',
			],
			id: [
				'Januari',
				'Februari',
				'Maret',
				'April',
				'Mei',
				'Juni',
				'Juli',
				'Agustus',
				'September',
				'Oktober',
				'November',
				'Desember',
			],
		}

		return monthNames[language]
	}, [language])

	return months
}
