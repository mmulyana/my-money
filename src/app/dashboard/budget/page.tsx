'use client'
import {
	IconChevronLeft,
	IconChevronRight,
	IconCalendarMonthFilled,
	IconPlus,
} from '@tabler/icons-react'

import BudgetTable from '@/features/budget/components/budget-table'
import BudgetForm from '@/features/budget/components/budget-form'
import useCalendarMonth from '@/shared/hooks/use-calendar-month'
import { Button } from '@/shared/components/ui/button'

export default function Page() {
	const { month, next, prev, monthIndex, year } = useCalendarMonth()

	return (
		<div className='space-y-4 w-full'>
			<div className='flex justify-between items-center'>
				<div className='flex gap-1 items-center'>
					<button
						onClick={prev}
						className='w-8 h-8 cursor-pointer hover:bg-white p-0 justify-center flex items-center rounded-md'
					>
						<IconChevronLeft size={16} strokeWidth={2.5}/>
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
						className='w-8 h-8 cursor-pointer hover:bg-white p-0 justify-center flex items-center rounded-md'
					>
						<IconChevronRight size={16} strokeWidth={2.5}/>
					</button>
				</div>
				<div className='flex gap-2 items-center'>
					<BudgetForm>
						<Button
							className='rounded text-sm gap-1 px-2.5 py-1.5 h-fit text-primary font-medium bg-[#ECECEC]'
							variant={'secondary'}
						>
							<IconPlus size={12} />
							New Budget
						</Button>
					</BudgetForm>
				</div>
			</div>
			<BudgetTable month={monthIndex} year={year} />
		</div>
	)
}
