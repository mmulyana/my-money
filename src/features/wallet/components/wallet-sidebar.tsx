'use client'

import { IconPlus, IconWallet } from '@tabler/icons-react'
import { useGetWallet } from '../api/get-wallet'
import WalletForm from './wallet-form'
import { Button } from '@/shared/components/ui/button'

export default function WalletSidebar() {
	const { data } = useGetWallet({})

	return (
		<div className='space-y-2'>
			<div className='flex justify-between items-center'>
				<div className='flex gap-1 items-center text-foreground/80'>
					<IconWallet size={20} />
					<p className='font-medium text-sm'>Wallet</p>
				</div>
				<WalletForm>
					<Button
						className='p-0 h-6 w-5 hover:bg-gray-200 rounded'
						variant={'secondary'}
					>
						<IconPlus />
					</Button>
				</WalletForm>
			</div>
			<div className='space-y-3.5'>
				{data?.data?.map((i) => (
					<div key={i.id} className='flex justify-between items-center'>
						<div className='flex gap-1 items-center'>
							<div
								className='w-1.5 h-1.5 rounded-full'
								style={{ backgroundColor: i.color }}
							></div>
							<p className='text-sm text-muted-foreground'>{i.name}</p>
						</div>
						<p className='text-sm text-muted-foreground'>{i.balance}</p>
					</div>
				))}
			</div>
		</div>
	)
}
