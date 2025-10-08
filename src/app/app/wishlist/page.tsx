'use client'

import { IconPlus } from '@tabler/icons-react'

import WishlistTable from '@/features/wishlist/components/wishlist-table'
import WishlistForm from '@/features/wishlist/components/wishlist-form'
import { Button } from '@/shared/components/ui/button'

export default function Page() {
	return (
		<div className='space-y-4 w-full'>
			<div className='flex justify-between items-center'>
				<p className='text-[15px] font-medium text-foreground'>Wishlist</p>
				<div className='flex gap-2 items-center'>
					<WishlistForm>
						<Button
							className='rounded text-sm gap-1 px-2.5 py-1.5 h-fit text-primary font-medium bg-[#ECECEC]'
							variant={'secondary'}
						>
							<IconPlus size={12} />
							New Wishlist
						</Button>
					</WishlistForm>
				</div>
			</div>
			<WishlistTable />
		</div>
	)
}
