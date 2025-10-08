'use client'

import { useMemo } from 'react'

import CategoryImage from '@/features/category/components/category-img'
import { useGetWallet } from '@/features/wallet/api/get-wallet'

import { SegmentBar } from '@/shared/components/common/segment-bar'
import { imgs } from '@/shared/constants/img'

export default function BalanceTotalCard() {
	const { data } = useGetWallet({})

	const total = useMemo(() => {
		if (!data?.data.length) return 0
		return data?.data?.reduce((acc, prev) => (acc += Number(prev.balance)), 0)
	}, [data?.data.length])

	return (
		<div className='bg-white rounded-lg p-4'>
			<p className='text-sm text-foreground/50 text-center mb-1'>
				Total Balance
			</p>
			<p className='text-lg font-medium text-center mb-3'>{total}</p>
			<SegmentBar
				total={total}
				data={
					data?.data?.map((i) => ({
						color: i.color,
						total: i.balance,
						id: i.id,
						name: i.name,
					})) || []
				}
			/>
			<div className='mt-4'>
				<p className='text-xs text-foreground/50 mb-3'>Wallets</p>
				<div className='space-y-4'>
					{data?.data?.map((i) => (
						<div key={i.id} className='flex justify-between items-center'>
							<div className='flex gap-3 items-center'>
								<CategoryImage
									color={i.color}
									variant='style-1'
									url={imgs[6]}
								/>
								<p className='text-foreground'>{i.name}</p>
							</div>
							<p className='text-foreground'>{i.balance}</p>
						</div>
					))}
				</div>
			</div>
		</div>
	)
}
