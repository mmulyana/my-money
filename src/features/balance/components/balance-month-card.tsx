'use client'

import { IconChevronDown } from '@tabler/icons-react'
import { useState } from 'react'

import { useGetMonthlySummary } from '@/features/transaction/api/get-monthly-summary'

import { SegmentBar } from '@/shared/components/common/segment-bar'
import { Button } from '@/shared/components/ui/button'
import { useMonths } from '@/shared/hooks/use-months'
import { cn } from '@/shared/lib/utils'
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from '@/shared/components/ui/popover'

export default function BalanceMonthCard() {
	const months = useMonths('en')
	const [selectedMonth, setSelectedMonth] = useState<number>(() =>
		new Date().getMonth()
	)

	const { data } = useGetMonthlySummary({
		year: new Date().getFullYear(),
		month: selectedMonth,
		enabled: true,
	})

	const total = data?.data
		? data?.data?.balance < 0
			? data?.data?.balance * -1
			: data?.data?.balance
		: 0

	return (
		<div className='bg-white rounded-lg'>
			<div className='border-b border-dashed p-4 pb-3 flex justify-between items-start'>
				<div>
					<p className='text-sm text-foreground/50'>Balance this month</p>
					<p className='text-lg font-medium text-foreground'>
						{data?.data?.balance}
					</p>
				</div>
				<Popover>
					<PopoverTrigger asChild>
						<Button variant='outline' className='shadow-none bg-white'>
							{months[selectedMonth]} 2025
							<IconChevronDown className='ml-1' />
						</Button>
					</PopoverTrigger>

					<PopoverContent
						align='end'
						className='p-2 grid grid-cols-3 gap-2 w-72'
					>
						{months.map((month, index) => (
							<Button
								key={month}
								variant={index === selectedMonth ? 'default' : 'outline'}
								onClick={() => setSelectedMonth(index)}
								className={cn(
									index !== selectedMonth && 'bg-white shadow-none'
								)}
							>
								{month}
							</Button>
						))}
					</PopoverContent>
				</Popover>
			</div>
			<div className='p-4'>
				<div className='flex justify-between  mb-3'>
					<div className='space-y-0.5'>
						<p className='text-sm text-foreground/50'>Income</p>
						<p className='text-foreground font-medium'>{data?.data?.income}</p>
					</div>
					<div className='space-y-0.5 text-right'>
						<p className='text-sm text-foreground/50'>Expense</p>
						<p className='text-foreground font-medium'>{data?.data?.expense}</p>
					</div>
				</div>
				<SegmentBar
					total={total}
					data={[
						{
							id: 'income',
							name: 'Income',
							color: '#10A986',
							total: data?.data?.income || 0,
						},
						{
							id: 'expense',
							name: 'Expense',
							color: '#ED4F4F',
							total: data?.data?.expense || 0,
						},
					]}
				/>
			</div>
		</div>
	)
}
