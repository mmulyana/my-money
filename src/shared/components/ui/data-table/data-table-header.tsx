'use client'

import { ArrowUp, ArrowDown, ArrowUpDown } from 'lucide-react'
import { Column } from '@tanstack/react-table'

import { Button } from '@/shared/components/ui/button'
import { cn } from '@/shared/lib/utils'
import { IconArrowDown, IconArrowsUpDown, IconArrowUp } from '@tabler/icons-react'

interface DataTableColumnHeaderProps<TData, TValue> {
	column: Column<TData, TValue>
	title: string
	className?: string
}

export function DataTableHeader<TData, TValue>({
	column,
	title,
	className,
}: DataTableColumnHeaderProps<TData, TValue>) {
	if (!column.getCanSort()) {
		return (
			<div className={cn('font-medium', className)}>
				<span>{title}</span>
			</div>
		)
	}
	console.log('column', column.id, column.getCanSort())

	const isSorted = column.getIsSorted()

	return (
		<Button
			variant='ghost'
			size='sm'
			className={cn(
				'gap-2 !p-0 h-fit justify-between w-full',
				className
			)}
			onClick={() => column.toggleSorting(isSorted === 'asc')}
		>
			<span>{title}</span>
			{isSorted === 'asc' && <IconArrowUp className='h-4 w-4' />}
			{isSorted === 'desc' && <IconArrowDown className='h-4 w-4' />}
			{!isSorted && <IconArrowsUpDown className='h-4 w-4 opacity-50' />}
		</Button>
	)
}
