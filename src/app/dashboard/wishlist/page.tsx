'use client'

import WishlistTable from '@/features/wishlist/components/wishlist-table'
import { Button } from '@/shared/components/ui/button'
import { IconPlus } from '@tabler/icons-react'

export default function Page() {
	return (
		<div className='space-y-4 w-full'>
			<div className='flex justify-between items-center'>
				<p className='text-[15px] font-medium text-foreground'>Wishlist</p>
				<div className='flex gap-2 items-center'>
					<Button
						className='rounded text-sm gap-1 px-2.5 py-2 text-primary font-medium bg-[#ECECEC]'
						variant={'secondary'}
					>
						<IconPlus size={12} />
						New Wishlist
					</Button>
				</div>
			</div>
			<WishlistTable />
		</div>
	)
}
