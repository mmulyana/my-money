'use client'

import { Pie, PieChart } from 'recharts'

import {
	ChartConfig,
	ChartContainer,
	ChartTooltip,
	ChartTooltipContent,
} from '@/shared/components/ui/chart'

const chartData = [
	{ wallet: 'Cash', total: 18000000, fill: '#F3A62B' },
]

const chartConfig = {
	Cash: {
		label: 'Cash',
		color: '#F3A62B',
	},
} satisfies ChartConfig

export function BalanceDonutChart() {
	return (
		<div className='mt-2'>
			<div className='mx-auto relative h-[104px] w-[104px]'>
				<ChartContainer
					config={chartConfig}
					className='mx-auto aspect-square w-[128px] h-[128px] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2'
				>
					<PieChart>
						<ChartTooltip
							cursor={false}
							content={<ChartTooltipContent hideLabel />}
						/>
						<Pie
							data={chartData}
							dataKey='total'
							nameKey='wallet'
							innerRadius={36}
							paddingAngle={4}
						/>
					</PieChart>
				</ChartContainer>
			</div>
			<div className='flex flex-wrap justify-center gap-2 mt-4'>
				{chartData.map((item) => (
					<div
						key={item.wallet}
						className='flex items-center gap-1.5 rounded-full border py-[5px] px-2 text-sm'
					>
						<div className='flex gap-1 items-center'>
							<span
								className='h-1.5 w-1.5 rounded-full'
								style={{ backgroundColor: item.fill }}
							/>
							<span className='text-foreground text-[10px]'>{item.wallet}</span>
						</div>
						<span className='text-foreground/50 text-[10px]'>{item.total}</span>
					</div>
				))}
			</div>
		</div>
	)
}
