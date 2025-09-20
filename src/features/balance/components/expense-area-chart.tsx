'use client'

import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from 'recharts'

import {
	ChartConfig,
	ChartContainer,
	ChartTooltip,
	ChartTooltipContent,
} from '@/shared/components/ui/chart'

export const description = 'A simple area chart'

const chartData = [
	{ month: '1 Jun', total: 10 },
	{ month: '4 Jun', total: 23 },
	{ month: '5 Jun', total: 28 },
	{ month: '6 Jun', total: 23 },
	{ month: '8 Jun', total: 20 },
	{ month: '10 Jun', total: 28 },
]

const chartConfig = {
	total: {
		label: 'Expense',
		color: '#FBD5D5',
	},
} satisfies ChartConfig

export function ExpenseAreaChart() {
	return (
		<ChartContainer config={chartConfig} className='w-[328px] h-[104px]'>
			<AreaChart
				accessibilityLayer
				data={chartData}
				margin={{
					left: 12,
					right: 12,
				}}
			>
				<CartesianGrid vertical={false} />
				<XAxis
					dataKey='month'
					tickLine={false}
					axisLine={false}
					tickMargin={8}
				/>
				<ChartTooltip
					cursor={false}
					content={<ChartTooltipContent indicator='line' />}
				/>
				<YAxis
					tickLine={false}
					axisLine={false}
					tickMargin={1}
					orientation='right'
				/>
				<Area
					dataKey='total'
					type='natural'
					fill='var(--color-total)'
					fillOpacity={0.4}
					stroke='var(--color-total)'
				/>
			</AreaChart>
		</ChartContainer>
	)
}
