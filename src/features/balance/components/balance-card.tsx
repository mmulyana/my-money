'use client'

import { useState } from 'react'

import AnimatedTab from '@/shared/components/common/animated-tab'

import { ExpenseAreaChart } from './expense-area-chart'
import { IncomeAreaChart } from './income-area-chart'

export default function BalanceCard() {
	const [tabIndex, setTabIndex] = useState(0)

	return (
		<div className='bg-white max-w-4xl rounded-[8px] pl-5 pb-3 pt-4 shadow shadow-muted-foreground/20 flex justify-between h-fit'>
			<div className='flex-1 flex flex-col justify-between pb-2'>
				<div>
					<p className='text-[13px] text-foreground/40'>Balance</p>
					<p className='font-medium text-foreground'>Rp 1,200,000</p>
				</div>
				<div>
					<p className='text-[13px] text-foreground/40'>Income</p>
					<p className='font-medium text-foreground'>Rp 4,200,000</p>
				</div>
				<div>
					<p className='text-[13px] text-foreground/40'>Expense</p>
					<p className='font-medium text-foreground'>Rp 3,000,000</p>
				</div>
			</div>
			<div className='border w-[360px] shrink-0 flex flex-col justify-between gap-4'>
				<div className='flex justify-between items-start'>
					<div className='space-y-0.5'>
						<p className='text-xs text-foreground/40'>Summary</p>
						<AnimatedTab
							tabs={[
								{
									name: 'Expense',
									onClick: () => {
										console.log('a')
									},
								},
								{
									name: 'Income',
									onClick: () => {
										console.log('a')
									},
								},
							]}
							activeIndex={tabIndex}
							onChange={(i) => setTabIndex(i)}
						/>
					</div>
				</div>
				{tabIndex > 0 ? <IncomeAreaChart /> : <ExpenseAreaChart />}
			</div>
		</div>
	)
}
