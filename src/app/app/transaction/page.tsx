'use client'
import {
	IconChevronLeft,
	IconChevronRight,
	IconCalendarMonthFilled,
	IconHourglass,
	IconHourglassEmpty,
	IconPlus,
} from '@tabler/icons-react'
import { useGetTransaction } from '@/features/transaction/api/get-transaction'
import { TransactionGroup } from '@/features/transaction/components/transaction-group'

import useCalendarMonth from '@/shared/hooks/use-calendar-month'
import TransactionForm from '@/features/transaction/components/transaction-form'
import { Button } from '@/shared/components/ui/button'

export default function Page() {
	const { month, next, prev, monthIndex, year } = useCalendarMonth()

	const { data } = useGetTransaction({
		month: monthIndex,
		year,
	})

	return (
		<div>
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

				<TransactionForm>
					<Button
						className='rounded text-sm gap-1 px-2.5 py-1.5 h-fit text-primary font-medium bg-[#ECECEC]'
						variant={'secondary'}
					>
						<IconPlus size={12} />
						New Record
					</Button>
				</TransactionForm>
			</div>

			<div className='flex gap-4 flex-col lg:flex-row'>
				<div className='flex-1 basis-[640px] flex flex-col gap-4'>
					{data?.data?.map((i) => (
						<TransactionGroup
							key={i.date}
							amount={i.total}
							date={i.date}
							transactions={i.transactions}
						/>
					))}
				</div>
				<div className='basis-[368px]'>
					<div className='space-y-3'>
						<div className='flex gap-2 items-center'>
							<IconHourglassEmpty size={18} strokeWidth={2.5} />
							<p className='text-foreground font-medium text-sm'>
								Pending Transaction
							</p>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}
