'use client'

import { ChevronsUpDown, Ellipsis } from 'lucide-react'
import { usePathname } from 'next/navigation'
import { ComponentType } from 'react'
import Link from 'next/link'
import {
	IconMap,
	IconPlus,
	IconStack2,
	IconWallet,
	IconLogout,
	IconCategory,
	IconSettings,
	IconPigFilled,
	IconSmartHome,
	IconShoppingBag,
} from '@tabler/icons-react'

import WalletForm from '@/features/wallet/components/wallet-form'
import { cn } from '@/shared/lib/utils'

import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'
import { Button } from '../ui/button'

const menuItems = [
	{ icon: IconSmartHome, label: 'Home', href: '/dashboard' },
	{ icon: IconStack2, label: 'Transaction', href: '/dashboard/transaction' },
	{ icon: IconMap, label: 'Budget', href: '/dashboard/budget' },
	{ icon: IconShoppingBag, label: 'Wishlist', href: '/dashboard/wishlist' },
]
export function Sidebar() {
	const pathname = usePathname()

	return (
		<div className='h-full w-[240px] p-4 hidden md:flex flex-col fixed'>
			<div className='flex gap-2 items-center'>
				<div className='h-7 w-7 rounded-full bg-primary flex justify-center items-center text-white'>
					<IconPigFilled className='w-[18px] h-[18px]' />
				</div>
				<p className='text-primary font-medium text-[15px]'>MyMoney</p>
			</div>

			<div className='space-y-6'>
				<nav className='flex flex-col gap-4 mt-6'>
					{menuItems.map((item) => (
						<SideLink
							key={item.label}
							href={item.href}
							icon={item.icon}
							label={item.label}
							pathname={pathname}
						/>
					))}
					<Popover>
						<PopoverTrigger asChild>
							<button
								className={cn(
									'flex gap-2 w-full justify-start rounded py-1.5 px-2 text-muted-foreground hover:bg-gray-200/50 hover:text-primary'
								)}
							>
								<Ellipsis className='w-5 h-5' />
								<span className='text-sm'>More</span>
							</button>
						</PopoverTrigger>
						<PopoverContent align='start' className='w-[210px] p-1 rounded-lg'>
							<Button
								variant={'secondary'}
								className='bg-transparent text-muted-foreground hover:text-primary w-full justify-start'
							>
								<IconWallet size={18} />
								Wallet
							</Button>
							<Button
								variant={'secondary'}
								className='bg-transparent text-muted-foreground hover:text-primary w-full justify-start'
							>
								<IconCategory size={18} />
								Category
							</Button>
						</PopoverContent>
					</Popover>
				</nav>
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
						<div className='flex justify-between items-center'>
							<div className='flex gap-1 items-center'>
								<div className='w-1.5 h-1.5 rounded-full bg-blue-500'></div>
								<p className='text-sm text-muted-foreground'>BCA</p>
							</div>
							<p className='text-sm text-muted-foreground'>Rp 100.400.000</p>
						</div>
					</div>
				</div>
			</div>

			<Popover>
				<PopoverTrigger asChild>
					<div className='flex justify-between items-center p-2 rounded hover:bg-muted-foreground/5 mt-auto w-full cursor-pointer'>
						<div className='flex items-center gap-2'>
							<div className='h-8 w-8 rounded bg-gray-300'></div>
							<p className='text-base font-medium'>mulyana</p>
						</div>
						<button>
							<ChevronsUpDown size={18} />
						</button>
					</div>
				</PopoverTrigger>
				<PopoverContent className='w-[210px] p-2 space-y-2'>
					<div className='flex items-center gap-2 border-b pb-2'>
						<div className='h-8 w-8 rounded bg-gray-300'></div>
						<p className='text-base leading-none'>mulyana</p>
					</div>
					<Button
						className='w-full justify-start rounded bg-transparent'
						variant={'secondary'}
					>
						<IconSettings />
						Setting
					</Button>
					<Button
						className='w-full justify-start rounded bg-transparent hover:text-red-500'
						variant={'secondary'}
					>
						<IconLogout />
						Logout
					</Button>
				</PopoverContent>
			</Popover>
		</div>
	)
}

function SideLink({
	href,
	icon: Icon,
	label,
	pathname,
}: {
	href: string
	icon: ComponentType<{ className?: string }>
	label: string
	pathname: string
}) {
	const isActive = pathname === href.toString()
	return (
		<Link
			href={href}
			className={cn(
				'flex gap-2 w-full rounded py-1.5 px-2 text-muted-foreground hover:bg-gray-200/50 hover:text-primary',
				isActive && 'bg-gray-200/30 text-primary'
			)}
		>
			<Icon className='w-5 h-5' />
			<span className='text-sm'>{label}</span>
		</Link>
	)
}
