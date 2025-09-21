'use client'

import { usePathname } from 'next/navigation'
import React, { ComponentType } from 'react'
import Link from 'next/link'

import { cn } from '@/shared/lib/utils'
import { Globe } from 'lucide-react'
import IcHome from '../icon/ic-home'
import IcStack2 from '../icon/ic-stack-2'
import IcMap from '../icon/ic-map'
import IcShopingBag from '../icon/ic-shoping-bag'
import IcPig from '../icon/ic-pig'

const menuItems = [
	{ icon: IcHome, label: 'Dashboard', href: '/' },
	{ icon: IcStack2, label: 'Transaction', href: '/transaction' },
	{ icon: IcMap, label: 'Budget', href: '/budget' },
	{ icon: IcShopingBag, label: 'Wishlist', href: '/wishlist' },
]
export function Sidebar() {
	const pathname = usePathname()

	return (
		<div className='h-full py-4 pl-4 flex flex-col'>
			<div className='flex gap-2 items-center'>
				<div className='h-7 w-7 rounded-full bg-primary flex justify-center items-center text-white'>
					<IcPig className='w-[18px] h-[18px]' />
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
				'flex gap-2 w-full rounded py-1.5 px-2 text-muted-foreground hover:bg-[#E7E7E7] hover:text-primary',
				isActive && 'bg-foreground/4 text-primary'
			)}
		>
			<Icon className='w-5 h-5' />
			<span className='text-sm'>{label}</span>
		</Link>
	)
}
