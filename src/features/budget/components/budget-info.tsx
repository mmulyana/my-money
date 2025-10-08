'use client'

import { SegmentBar } from '@/shared/components/common/segment-bar'

export default function BudgetInfo() {
	return (
		<div className='bg-white rounded-lg'>
			<div className='border-b border-dashed p-4 pb-3 flex justify-between'>
				<div className='space-y-0.5'>
					<p className='text-sm text-foreground/50'>Total budget</p>
					<p className='text-foreground font-medium'>20.500.000</p>
				</div>
				<div className='space-y-0.5 text-right'>
					<p className='text-sm text-foreground/50'>Total Spent</p>
					<p className='text-foreground font-medium'>2.800.000</p>
				</div>
			</div>

			<div className='p-4'>
				<div className='flex justify-between mb-3'>
					<p className='text-sm text-foreground/50'>Budget</p>
					<p className='text-sm text-foreground/50'>Remaining</p>
				</div>
				<div className='space-y-4'>
					<div>
						<div className='flex justify-between mb-2'>
							<p className='text-foreground text-base'>
								Household needs
							</p>
							<p className='text-foreground text-base'>
								10.400.000
							</p>
						</div>
						<SegmentBar
							total={100}
							items={[
								{
									color: '#10A986',
									value: 80,
								},
								{
									color: '#ECECEC',
									value: 20,
								},
							]}
						/>
						<div className='flex justify-between mt-1'>
							<p className='text-foreground/50 text-sm'>11.000.000</p>
							<p className='text-foreground/50 text-sm'>600.000</p>
						</div>
					</div>
					<div>
						<div className='flex justify-between mb-2'>
							<p className='text-foreground text-base'>
								Entertainment
							</p>
							<p className='text-foreground text-base'>
								10.400.000
							</p>
						</div>
						<SegmentBar
							total={100}
							items={[
								{
									color: '#10A986',
									value: 70,
								},
								{
									color: '#ECECEC',
									value: 30,
								},
							]}
						/>
						<div className='flex justify-between mt-1'>
							<p className='text-foreground/50 text-sm'>11.000.000</p>
							<p className='text-foreground/50 text-sm'>600.000</p>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}
