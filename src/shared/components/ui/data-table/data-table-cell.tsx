'use client'

import { Cell } from '@tanstack/react-table'
import { ReactNode } from 'react'

import { cn } from '@/shared/lib/utils'

interface DataTableCellProps<TData, TValue> {
	cell: Cell<TData, TValue>
	render?: (value: TValue, cell: Cell<TData, TValue>) => ReactNode
	className?: string
}

export function DataTableCell<TData, TValue>({
	cell,
	render,
	className,
}: DataTableCellProps<TData, TValue>) {
	const value = cell.getValue<TValue>()
	return (
		<div
			className={cn(className)}
		>
			{render ? render(value, cell) : <p>{String(value ?? '')}</p>}
		</div>
	)
}
