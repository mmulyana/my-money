'use client'

import { usePathname } from 'next/navigation'
import React, { ComponentType } from 'react'
import Link from 'next/link'
import {
	IconMap,
	IconStack2,
	IconPigFilled,
	IconSmartHome,
	IconShoppingBag,
	IconTriangleInvertedFilled,
} from '@tabler/icons-react'

import { cn } from '@/shared/lib/utils'
import { ChevronsUpDown } from 'lucide-react'

const menuItems = [
	{ icon: IconSmartHome, label: 'Dashboard', href: '/dashboard' },
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
			</nav>

			<div className='flex justify-between items-center p-1 rounded-md hover:bg-gray-200/30 mt-auto'>
				<div className='flex justify-between items-center gap-2'>
					<div className='h-6 w-6 rounded bg-gray-300'></div>
					<p className='text-base leading-none'>mulyana</p>
				</div>
				<button>
					<ChevronsUpDown size={18} />
				</button>
			</div>
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
