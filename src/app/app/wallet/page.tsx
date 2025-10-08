'use client'

import { IconPlus } from '@tabler/icons-react'

import WalletItem from '@/features/wallet/components/wallet-item'
import { useGetWallet } from '@/features/wallet/api/get-wallet'

import { Button } from '@/shared/components/ui/button'
import WalletForm from '@/features/wallet/components/wallet-form'

export default function Page() {
	const { data } = useGetWallet({})

	return (
		<div className='space-y-4 w-full max-w-3xl px-4 mx-auto'>
			<div className='flex justify-between items-center'>
				<p className='text-[15px] font-medium text-foreground'>Wallet</p>
				<div className='flex gap-2 items-center'>
					<WalletForm>
						<Button
							className='rounded text-sm gap-1 px-2.5 py-1.5 h-fit text-primary font-medium bg-[#ECECEC]'
							variant={'secondary'}
						>
							<IconPlus size={12} />
							New
						</Button>
					</WalletForm>
				</div>
			</div>
			<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
				{data?.data?.map((i) => (
					<WalletItem key={i.id} data={i} />
				))}
			</div>
		</div>
	)
}
