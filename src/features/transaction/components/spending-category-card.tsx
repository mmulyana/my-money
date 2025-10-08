'use client'

import { useMemo, useState } from 'react'

import CategoryImage from '@/features/category/components/category-img'

import { SegmentBar } from '@/shared/components/common/segment-bar'
import { imgs } from '@/shared/constants/img'

import { useGetExpenseCategory } from '../api/get-expense-category'

export default function SpendingCategoryCard() {
	const [currDate] = useState<Date>(() => new Date())

	const { data } = useGetExpenseCategory({
		date: currDate.toString(),
		enabled: true,
	})

	const total = useMemo(() => {
		if (!data) return 0
		return data?.data?.reduce((acc, trx) => (acc += Number(trx.total)), 0)
	}, [JSON.stringify(data?.data)])

	return (
		<div className='bg-white rounded-lg'>
			<div className='border-b border-dashed p-4 pb-3 flex justify-between'>
				<div className='space-y-0.5'>
					<p className='text-sm text-foreground/50'>Overview</p>
					<p className='text-foreground font-medium'>Spending by Category</p>
				</div>
			</div>
			<div className='p-4 pt-3'>
				<p className='text-xs text-foreground/50 mb-3'>Wallets</p>
				<div className='space-y-4'>
					{data?.data?.map((i) => {
						const percent = (i.total / total) * 100
						return (
							<div className='flex gap-2 items-start' key={i.id}>
								<div className='w-9 shrink-0'>
									<CategoryImage
										color={i.color}
										url={i.imageUrl}
										variant={i.imageVariant as any}
									/>
								</div>
								<div className='space-y-1 flex-1'>
									<div className='flex justify-between items-center'>
										<p className='text-sm text-foreground/80'>{i.name}</p>
										<p className='text-sm text-foreground/80'>
											{percent.toFixed(0)}%
										</p>
									</div>
									<SegmentBar
										className='bg-transparent'
										total={total}
										data={[
											{
												id: i.id,
												name: i.name,
												color: i.color,
												total: i.total,
											},
										]}
									/>
								</div>
							</div>
						)
					})}
				</div>
			</div>
		</div>
	)
}
