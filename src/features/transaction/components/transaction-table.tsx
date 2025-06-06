'use client'

import useTransaction from '../api/use-transaction'

export default function TransactionTable() {
	const { data } = useTransaction()
	console.log('data', data)

	return (
		<div>
			<p>Table</p>
		</div>
	)
}
