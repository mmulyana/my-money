'use client'

import { useState } from 'react'
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from 'recharts'

import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '@/shared/components/ui/card'
import { Tabs, TabsList, TabsTrigger } from '@/shared/components/ui/tabs'
import {
	ChartConfig,
	ChartContainer,
	ChartLegend,
	ChartLegendContent,
	ChartTooltip,
	ChartTooltipContent,
} from '@/shared/components/ui/chart'
import { IconChartBar } from '@tabler/icons-react'

const data1W = [
	{ date: '12/10', income: 200000, expense: 180000 },
	{ date: '15/10', income: 180000, expense: 100000 },
	{ date: '16/10', income: 220000, expense: 150000 },
	{ date: '17/10', income: 0, expense: 100000 },
	{ date: '18/10', income: 200000, expense: 150000 },
	{ date: '20/10', income: 120000, expense: 0 },
]

const data2W = [
	{ date: '12/10', income: 20000, expense: 180000 },
	{ date: '15/10', income: 180000, expense: 100000 },
	{ date: '16/10', income: 220000, expense: 150000 },
	{ date: '17/10', income: 200000, expense: 100000 },
	{ date: '18/10', income: 200000, expense: 150000 },
	{ date: '20/10', income: 120000, expense: 0 },

	{ date: '12/10', income: 200000, expense: 180000 },
	{ date: '15/10', income: 180000, expense: 100000 },
	{ date: '16/10', income: 220000, expense: 150000 },
	{ date: '17/10', income: 400000, expense: 100000 },
	{ date: '18/10', income: 200000, expense: 150000 },
	{ date: '20/10', income: 120000, expense: 0 },
]

const data1M = [
	{ date: '12/10', income: 200000, expense: 180000 },
	{ date: '15/10', income: 180000, expense: 100000 },
	{ date: '16/10', income: 220000, expense: 150000 },
	{ date: '17/10', income: 40000, expense: 100000 },
	{ date: '18/10', income: 200000, expense: 150000 },
	{ date: '20/10', income: 120000, expense: 0 },

	{ date: '12/10', income: 200000, expense: 180000 },
	{ date: '15/10', income: 180000, expense: 100000 },
	{ date: '16/10', income: 220000, expense: 150000 },
	{ date: '17/10', income: 10000, expense: 100000 },
	{ date: '18/10', income: 200000, expense: 150000 },
	{ date: '20/10', income: 120000, expense: 0 },

	{ date: '12/10', income: 200000, expense: 180000 },
	{ date: '15/10', income: 180000, expense: 100000 },
	{ date: '16/10', income: 220000, expense: 150000 },
	{ date: '17/10', income: 3000000, expense: 100000 },
	{ date: '18/10', income: 200000, expense: 150000 },
	{ date: '20/10', income: 120000, expense: 0 },
]

const chartConfig = {
	income: {
		label: 'Income',
		color: '#187D86',
	},
	expense: {
		label: 'Expense',
		color: '#ED4F4F',
	},
} satisfies ChartConfig

export default function CashflowChart() {
	const [tab, setTab] = useState('1w')

	const getData = () => {
		switch (tab) {
			case '2w':
				return data2W
			case '1m':
				return data1M
			default:
				return data1W
		}
	}

	return (
		<div className='p-4 rounded-lg bg-white'>
			<div className='flex flex-row items-center justify-between mb-4'>
				<div>
					<div className='flex gap-2 items-center'>
						<IconChartBar size={16} className='text-[#2B88F3]' />
						<span className='text-xs text-foreground'>Daily Cashflow</span>
					</div>
					<p className='text-xs text-muted-foreground/50'>
						Track your daily income and expenses
					</p>
				</div>
				<Tabs value={tab} onValueChange={setTab}>
					<TabsList className='rounded-full h-fit'>
						<TabsTrigger
							value='1w'
							className='text-[10px] px-2.5 py-0.5 h-fit rounded-full data-[state=active]:bg-white'
						>
							1W
						</TabsTrigger>
						<TabsTrigger
							value='2w'
							className='text-[10px] px-2.5 py-0.5 h-fit rounded-full data-[state=active]:bg-white'
						>
							2W
						</TabsTrigger>
						<TabsTrigger
							value='1m'
							className='text-[10px] px-2.5 py-0.5 h-fit rounded-full data-[state=active]:bg-white'
						>
							1M
						</TabsTrigger>
					</TabsList>
				</Tabs>
			</div>
			<ChartContainer config={chartConfig} className='w-full h-[140px]'>
				<BarChart barSize={16} accessibilityLayer data={getData()} barGap={6}>
					<CartesianGrid vertical={false} />
					<XAxis
						dataKey='date'
						tickLine={false}
						axisLine={false}
						tickMargin={10}
					/>
					<ChartTooltip content={<ChartTooltipContent />} />
					<Bar dataKey='expense' stackId='a' fill='var(--color-expense)' />
					<Bar dataKey='income' stackId='a' fill='var(--color-income)' />
				</BarChart>
			</ChartContainer>
		</div>
	)
}
