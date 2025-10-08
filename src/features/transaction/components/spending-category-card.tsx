import CategoryImage from '@/features/category/components/category-img'
import { SegmentBar } from '@/shared/components/common/segment-bar'
import { imgs } from '@/shared/constants/img'

export default function SpendingCategoryCard() {
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
					<div className='flex gap-2 items-start'>
						<div className='w-9 shrink-0'>
							<CategoryImage color='#2B88F3' url={imgs[2]} variant='style-1' />
						</div>
						<div className='space-y-1 flex-1'>
							<div className='flex justify-between items-center'>
								<p className='text-sm text-foreground/80'>Clothes</p>
								<p className='text-sm text-foreground/80'>80%</p>
							</div>
							<SegmentBar
								total={100}
								items={[
									{
										color: '#2B88F3',
										value: 80,
									},
									{
										color: '#ECECEC',
										value: 20,
									},
								]}
							/>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}
