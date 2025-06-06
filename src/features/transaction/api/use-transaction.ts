import { useQuery } from '@tanstack/react-query'

async function fetchTransactions() {
	const res = await fetch('/api/transactions', {
		credentials: 'include',
	})

	if (!res.ok) {
		const errorText = await res.text()
		throw new Error(errorText || 'Failed to fetch transactions')
	}

	return res.json()
}

export default function useTransaction() {
	return useQuery({
		queryKey: ['transactions'],
		queryFn: fetchTransactions,
		staleTime: 1000 * 60 * 5,
	})
}
