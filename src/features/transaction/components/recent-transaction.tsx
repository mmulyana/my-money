'use client'

import useCalendarMonth from '@/shared/hooks/use-calendar-month'
import { useGetTransaction } from '../api/get-transaction'
import { TransactionGroup } from './transaction-group'

export default function RecentTransaction() {
	const { monthIndex, year } = useCalendarMonth()

	const { data } = useGetTransaction({
		month: monthIndex,
		year,
    pagination: {
      limit: 10,
      page: 1
    }
	})

	return (
		<div>
			<p className='text-lg text-foreground mb-4'>Recent Transaction</p>
			<div className='flex gap-4 flex-col'>
				{data?.data?.map((i) => (
					<TransactionGroup
						key={i.date}
						amount={i.total}
						date={i.date}
						transactions={i.transactions}
					/>
				))}
			</div>
		</div>
	)
}
