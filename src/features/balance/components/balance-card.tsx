'use client'

import { BalanceDonutChart } from './balance-donut-chart'

export default function BalanceCard() {
	return (
		<div className='bg-white w-full p-4 flex flex-col justify-center items-center rounded-lg'>
			<p className='text-foreground/50 text-xs'>Total Balance</p>
			<p className='text-foreground font-medium'>Rp 400,000,000</p>

			<BalanceDonutChart />
		</div>
	)
}
