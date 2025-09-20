'use client'

import { CalendarDays, ChevronLeft, ChevronRight } from 'lucide-react'

import useCalendarMonth from '@/shared/hooks/use-calendar-month'
import { Button } from '@/shared/components/ui/button'

type BudgetCardProps = {
	remainingBudget: number
	totalBudget: number
}
export default function BudgetRemaining({
	remainingBudget,
	totalBudget,
}: BudgetCardProps) {
	const { next, prev, month } = useCalendarMonth()

	const progress = (remainingBudget / totalBudget) * 100

	return (
		<div className='space-y-3.5'>
			<div className='flex gap-2'>
				<Button
					className='h-fit w-8'
					variant='secondary'
					onClick={() => prev()}
				>
					<ChevronLeft />
				</Button>
				<Button
					className='h-fit w-8'
					variant='secondary'
					onClick={() => next()}
				>
					<ChevronRight />
				</Button>
				<div className='ml-1 flex gap-2 items-center'>
					<CalendarDays size={20} />
					<p>{month}</p>
				</div>
			</div>

			<div className='p-4 bg-white rounded-xl shadow shadow-muted-foreground/20 w-96 font-sans'>
				<p className='text-foreground/50 text-sm mb-1.5'>Remaining Budget</p>
				<h2 className='text-lg font-medium mb-4'>{remainingBudget}</h2>
				<div className='w-full bg-gray-100 rounded-full h-2 mb-2'>
					<div
						className='bg-[#2B88F3] h-2 rounded-full'
						style={{ width: `${progress}%` }}
					></div>
				</div>
				<p className='text-foreground/50 text-sm'>
					Total budget : {totalBudget}
				</p>
			</div>
		</div>
	)
}
