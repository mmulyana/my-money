'use client'

import { IconChevronRight, IconDots } from '@tabler/icons-react'
import {
	getCoreRowModel,
	useReactTable,
	flexRender,
	ColumnDef,
} from '@tanstack/react-table'

import ProgressBar from '@/shared/components/common/progress-bar'
import { DataTableHeader } from '@/shared/components/ui/data-table/data-table-header'
import { DataTableCell } from '@/shared/components/ui/data-table/data-table-cell'
import { Button } from '@/shared/components/ui/button'
import { cn } from '@/shared/lib/utils'
import {
	Table,
	TableRow,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
} from '@/shared/components/ui/table'

import { useGetWishlist } from '../api/get-wishlist'
import { Wishlist } from '../types'

export const columns: ColumnDef<Wishlist>[] = [
	{
		accessorKey: 'name',
		header: ({ column }) => <DataTableHeader column={column} title='Name' />,
		cell: ({ cell }) => <DataTableCell cell={cell} />,
		enableSorting: false,
	},
	{
		accessorKey: 'total',
		header: ({ column }) => (
			<DataTableHeader column={column} title='Total' className='text-right' />
		),
		cell: ({ cell }) => (
			<DataTableCell cell={cell} className='[&_p]:text-right' />
		),
		enableSorting: false,
	},
	{
		accessorKey: 'funded',
		header: ({ column }) => (
			<DataTableHeader column={column} title='Funded' className='text-right' />
		),
		cell: ({ cell }) => (
			<DataTableCell
				cell={cell}
				render={(value) => value?.toLocaleString()}
				className='text-right'
			/>
		),
		enableSorting: false,
	},
	{
		accessorKey: 'deadlineAt',
		header: ({ column }) => (
			<DataTableHeader
				column={column}
				title='Deadline'
				className='text-center'
			/>
		),
		cell: ({ cell }) => <DataTableCell cell={cell} className='text-center' />,
		enableSorting: false,
	},
	{
		accessorKey: 'daysLeft',
		header: ({ column }) => (
			<DataTableHeader
				column={column}
				title='Days Left'
				className='text-center'
			/>
		),
		cell: ({ cell }) => <DataTableCell cell={cell} className='text-center' />,
		enableSorting: false,
	},
	{
		accessorKey: 'progress',
		header: ({ column }) => (
			<DataTableHeader column={column} title='Progress' />
		),
		cell: ({ cell }) => (
			<DataTableCell
				cell={cell}
				render={(value: number) => (
					<ProgressBar progress={value} color='#187D86' />
				)}
			/>
		),
		enableSorting: false,
	},
	{
		id: 'action',
		header: '',
		cell: () => (
			<div className='flex justify-end'>
				<Button variant={'ghost'} className='hover:bg-muted-foreground/10 h-8 w-8'>
					<IconChevronRight className='!w-5 !h-5 text-foreground/50' strokeWidth={2.5}/>
				</Button>
			</div>
		),
	},
]

export default function WishlistTable() {
	const { data } = useGetWishlist()

	const table = useReactTable({
		data: data?.data || [],
		columns,
		getCoreRowModel: getCoreRowModel(),
	})

	return (
		<div className='rounded-lg bg-white border shadow-xs overflow-hidden'>
			<Table>
				<TableHeader>
					{table.getHeaderGroups().map((headerGroup) => (
						<TableRow key={headerGroup.id}>
							{headerGroup.headers.map((header) => (
								<TableHead
									key={header.id}
									className={cn(
										'whitespace-nowrap h-12 text-foreground/80',
										header.index === 0 && 'pl-4'
									)}
								>
									{header.isPlaceholder
										? null
										: flexRender(
												header.column.columnDef.header,
												header.getContext()
										  )}
								</TableHead>
							))}
						</TableRow>
					))}
				</TableHeader>
				<TableBody>
					{table.getRowModel().rows?.length ? (
						table.getRowModel().rows.map((row) => (
							<TableRow key={row.id}>
								{row.getVisibleCells().map((cell) => (
									<TableCell
										key={cell.id}
										className={cn(
											'whitespace-nowrap',
											cell.column.getIndex() === 0 && 'pl-4',
											cell.column.getIndex() === 6 && 'pr-4'
										)}
									>
										{flexRender(cell.column.columnDef.cell, cell.getContext())}
									</TableCell>
								))}
							</TableRow>
						))
					) : (
						<TableRow>
							<TableCell colSpan={columns.length} className='text-center'>
								No results.
							</TableCell>
						</TableRow>
					)}
				</TableBody>
			</Table>
		</div>
	)
}
