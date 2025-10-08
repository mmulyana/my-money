'use client'

import { SegmentBar } from '@/shared/components/common/segment-bar'
import { useGetBudget } from '../api/get-budget'
import { useMemo } from 'react'

export default function BudgetInfo() {
	const { data } = useGetBudget()

	const total = useMemo(() => {
		if (!data) return 0
		return data?.data?.reduce((acc, prev) => (acc += Number(prev.total)), 0)
	}, [data?.data?.length])
	const totalSpent = useMemo(() => {
		if (!data) return 0
		return data?.data?.reduce((acc, prev) => (acc += Number(prev.spent)), 0)
	}, [data?.data?.length])

	return (
		<div className='bg-white rounded-lg'>
			<div className='border-b border-dashed p-4 pb-3 flex justify-between'>
				<div className='space-y-0.5'>
					<p className='text-sm text-foreground/50'>Total budget</p>
					<p className='text-foreground font-medium'>{total}</p>
				</div>
				<div className='space-y-0.5 text-right'>
					<p className='text-sm text-foreground/50'>Total Spent</p>
					<p className='text-foreground font-medium'>{totalSpent}</p>
				</div>
			</div>

			<div className='p-4'>
				<div className='flex justify-between mb-3'>
					<p className='text-sm text-foreground/50'>Budget</p>
					<p className='text-sm text-foreground/50'>Remaining</p>
				</div>
				<div className='space-y-6'>
					{data?.data?.map((i) => (
						<div key={i.id}>
							<div className='flex justify-between mb-1'>
								<p className='text-foreground text-base'>{i.name}</p>
								<p className='text-foreground text-base font-medium'>
									{i.remaining}
								</p>
							</div>
							<SegmentBar
								total={i.total}
								data={
									i?.categories?.map((i) => ({
										color: i.category.color,
										id: i.id,
										name: i.category.name,
										total: i.actual,
									})) || []
								}
							/>
							<div className='flex justify-end mt-1'>
								<p className='text-foreground font-medium'>
									{i.spent}
									<span className='opacity-50 font-normal text-sm'>
										/{i.total}
									</span>
								</p>
							</div>
						</div>
					))}
				</div>
			</div>
		</div>
	)
}
