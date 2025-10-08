'use client'

import { Tabs, TabsList, TabsTrigger } from '@/shared/components/ui/tabs'
import { BarChart, Bar, XAxis, Tooltip, ResponsiveContainer } from 'recharts'

const data = [
	{ date: '10 Oct', expense: 40000 },
	{ date: '11 Oct', expense: 70000 },
	{ date: '12 Oct', expense: 55000 },
	{ date: '13 Oct', expense: 25000 },
	{ date: '14 Oct', expense: 50000 },
	{ date: '15 Oct', expense: 30000 },
	{ date: '16 Oct', expense: 0 },
	{ date: '17 Oct', expense: 50000 },
	{ date: '18 Oct', expense: 75000 },
	{ date: '19 Oct', expense: 75000 },
	{ date: '20 Oct', expense: 60000 },
	{ date: '21 Oct', expense: 25000 },
	{ date: '22 Oct', expense: 45000 },
	{ date: '23 Oct', expense: 45000 },
	{ date: '24 Oct', expense: 30000 },
	{ date: '25 Oct', expense: 0 },
	{ date: '30 Oct', expense: 40000 },
]

export default function DailyExpenseCard() {
	return (
		<div className='bg-white rounded-lg px-4 pt-4'>
			<div className='flex justify-between items-center mb-4'>
				<p className='text-foreground/50 text-sm'>Daily expense</p>
				<Tabs defaultValue='1W'>
					<TabsList className='rounded-full gap-1 h-8'>
						<TabsTrigger value='1W' className='!text-xs rounded-full data-[state=active]:bg-white !px-3 !py-1 cursor-pointer data-[state=inactive]:hover:bg-foreground/10'>1W</TabsTrigger>
						<TabsTrigger value='2W' className='!text-xs rounded-full data-[state=active]:bg-white !px-3 !py-1 cursor-pointer data-[state=inactive]:hover:bg-foreground/10'>2W</TabsTrigger>
						<TabsTrigger value='1M' className='!text-xs rounded-full data-[state=active]:bg-white !px-3 !py-1 cursor-pointer data-[state=inactive]:hover:bg-foreground/10'>1M</TabsTrigger>
						<TabsTrigger value='2M' className='!text-xs rounded-full data-[state=active]:bg-white !px-3 !py-1 cursor-pointer data-[state=inactive]:hover:bg-foreground/10'>2M</TabsTrigger>
						<TabsTrigger value='3M' className='!text-xs rounded-full data-[state=active]:bg-white !px-3 !py-1 cursor-pointer data-[state=inactive]:hover:bg-foreground/10'>3M</TabsTrigger>
					</TabsList>
				</Tabs>
			</div>
			<div className='w-full h-40'>
				<ResponsiveContainer width='100%' height='100%'>
					<BarChart data={data} barSize={20}>
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
						<Bar dataKey='expense' radius={[6, 6, 0, 0]} fill='#EF4444' />
					</BarChart>
				</ResponsiveContainer>
			</div>
		</div>
	)
}
