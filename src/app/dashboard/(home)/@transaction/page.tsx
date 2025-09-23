'use client'

import {
	IconCalendarMonthFilled,
	IconChevronLeft,
	IconChevronRight,
	IconPlus,
} from '@tabler/icons-react'

import useCalendarMonth from '@/shared/hooks/use-calendar-month'
import { TransactionGroup } from '@/features/transaction/components/transaction-group'
import TransactionForm from '@/features/transaction/components/transaction-form'
import { Button } from '@/shared/components/ui/button'
import { Plus } from 'lucide-react'

export default function Transaction() {
	const { month, next, prev } = useCalendarMonth()
	return (
		<div>
			<div className='flex justify-between items-center mb-6'>
				<p className='text-base text-foreground'>Latest Transaction</p>
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

			<TransactionGroup
				date='2025-09-21'
				amount={240000}
				transactions={[
					{
						amount: -80000,
						remark: 'Sate maranggi',
						category: { name: 'Food', color: '#F3A62B' },
					},
					{
						amount: 1000000,
						remark: 'Gaji bulanan, Tunjangan..',
						category: { name: 'Salary', color: '#2AAA7F' },
					},
					{
						amount: -60000,
						remark: 'Fuel',
						category: { name: 'Transport', color: '#2C66BD' },
					},
				]}
			/>
			<TransactionGroup
				date='2025-09-21'
				amount={240000}
				transactions={[
					{
						amount: -80000,
						remark: 'Sate maranggi',
						category: { name: 'Food', color: '#F3A62B' },
					},
					{
						amount: 1000000,
						remark: 'Gaji bulanan, Tunjangan..',
						category: { name: 'Salary', color: '#2AAA7F' },
					},
					{
						amount: -60000,
						remark: 'Fuel',
						category: { name: 'Transport', color: '#2C66BD' },
					},
				]}
			/>

			<TransactionForm>
				<Button suppressHydrationWarning className='fixed bottom-6 right-6 rounded-full !p-0 w-16 md:h-10 h-16 md:w-10'>
					<Plus size={32} strokeWidth={3} />
				</Button>
			</TransactionForm>
		</div>
	)
}
