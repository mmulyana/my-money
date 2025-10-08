'use client'

import { Tabs, TabsList, TabsTrigger } from '@/shared/components/ui/tabs'
import { BarChart, Bar, XAxis, Tooltip, ResponsiveContainer } from 'recharts'
import { useGetExpenseRange } from '../api/get-expense-range'
import { useState } from 'react'

export default function DailyExpenseCard() {
	const [currDate] = useState<Date>(() => new Date())
	const [range, setRange] = useState<'1w' | '2w' | '1m'>('1w')

	const { data, isFetching } = useGetExpenseRange({
		date: currDate.toString(),
		range,
		enabled: true,
	})

	const expenses = data?.data || []

	return (
		<div className='bg-white rounded-lg px-4 pt-4'>
			<div className='flex justify-between items-center mb-4'>
				<p className='text-foreground/50 text-sm'>Daily expense</p>

				<Tabs
					defaultValue='1W'
					onValueChange={(val) => {
						if (val === '1W') setRange('1w')
						if (val === '2W') setRange('2w')
						if (val === '1M') setRange('1m')
					}}
				>
					<TabsList className='rounded-full gap-1 h-8'>
						{['1W', '2W', '1M'].map((item) => (
							<TabsTrigger
								key={item}
								value={item}
								className='!text-xs rounded-full data-[state=active]:bg-white !px-3 !py-1 cursor-pointer data-[state=inactive]:hover:bg-foreground/10'
							>
								{item}
							</TabsTrigger>
						))}
					</TabsList>
				</Tabs>
			</div>

			{/* Chart */}
			<div className='w-full h-40'>
				{isFetching ? (
					<div className='flex justify-center items-center h-full text-gray-400 text-sm'>
						Loading...
					</div>
				) : (
					<ResponsiveContainer>
						<BarChart
							data={expenses}
							barSize={20}
							margin={{
								top: 10,
								right: 20,
								left: 20,
								bottom: 0,
							}}
						>
							<XAxis
								dataKey='date'
								tick={{ fill: '#9CA3AF', fontSize: 12 }}
								axisLine={false}
								tickLine={false}
							/>
							<Tooltip
								cursor={{ fill: 'rgba(0,0,0,0.05)' }}
								contentStyle={{
									borderRadius: '0.5rem',
									border: 'none',
									backgroundColor: '#fff',
									boxShadow: '0 2px 6px rgba(0,0,0,0.1)',
								}}
								formatter={(value: number) => [`${value}`, 'Expense']}
							/>
							<Bar
								dataKey='expense'
								radius={[6, 6, 0, 0]}
								fill='#EF4444'
								height={200}
							/>
						</BarChart>
					</ResponsiveContainer>
				)}
			</div>
		</div>
	)
}
