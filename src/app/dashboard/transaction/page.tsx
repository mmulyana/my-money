'use client'
import {
	IconChevronLeft,
	IconChevronRight,
	IconCalendarMonthFilled,
} from '@tabler/icons-react'
import { useGetTransaction } from '@/features/transaction/api/get-transaction'
import { TransactionGroup } from '@/features/transaction/components/transaction-group'

import useCalendarMonth from '@/shared/hooks/use-calendar-month'

export default function Page() {
	const { month, next, prev, monthIndex, year } = useCalendarMonth()

	const { data } = useGetTransaction({
		month: monthIndex,
		year,
	})

	return (
		<div className=''>
			<div className='flex justify-between items-center mb-4 h-8'>
				<p className='text-[15px] font-medium text-foreground'>Transactions</p>
				<div className='flex gap-1 items-center'>
					<button
						onClick={prev}
						className='w-5 h-5 cursor-pointer hover:bg-white p-0 justify-center flex items-center rounded'
					>
						<IconChevronLeft size={16} />
					</button>
					<div className='flex gap-2 items-center w-28 justify-center'>
						<p className='text-sm text-foreground'>{month}</p>
						<IconCalendarMonthFilled
							size={20}
							className='text-muted-foreground'
						/>
					</div>
					<button
						onClick={next}
						className='w-5 h-5 cursor-pointer hover:bg-white p-0 justify-center flex items-center rounded'
					>
						<IconChevronRight size={16} />
					</button>
				</div>
			</div>

			{data?.data?.map((i) => (
				<TransactionGroup
					key={i.date}
					amount={i.total}
					date={i.date}
					transactions={i.transactions}
				/>
			))}
		</div>
	)
}
