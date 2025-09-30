'use client'

import * as React from 'react'
import {
	useReactTable,
	getCoreRowModel,
	flexRender,
	ColumnDef,
} from '@tanstack/react-table'

import { DataTableHeader } from '@/shared/components/ui/data-table/data-table-header'
import { DataTableCell } from '@/shared/components/ui/data-table/data-table-cell'
import ProgressBar from '@/shared/components/common/progress-bar'
import {
	Table,
	TableRow,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
} from '@/shared/components/ui/table'
import { Button } from '@/shared/components/ui/button'
import { IconDots } from '@tabler/icons-react'

type Budget = {
	name: string
	total: string
	funded: string
	deadline: string
	daysLeft: number
	progress: number
}

const data: Budget[] = [
	{
		name: 'Iphone 13',
		total: '8.000.000',
		funded: '4.000.000',
		deadline: '30/11/2025',
		daysLeft: 10,
		progress: 28,
	},
]

export const columns: ColumnDef<Budget>[] = [
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
		accessorKey: 'deadline',
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
					<div>
						<ProgressBar progress={value} color='#187D86' />
					</div>
				)}
			/>
		),
		enableSorting: false,
	},
	{
		id: 'action',
		header: '',
		cell: () => (
			<div className='flex justify-end w-full pr-4'>
				<Button variant={'ghost'} className='!py-0'>
					<IconDots size={24} />
				</Button>
			</div>
		),
	},
]

export default function WishlistTable() {
	const table = useReactTable({
		data,
		columns,
		getCoreRowModel: getCoreRowModel(),
	})

	return (
		<div className='rounded-lg bg-white border'>
			<Table>
				<TableHeader>
					{table.getHeaderGroups().map((headerGroup) => (
						<TableRow key={headerGroup.id}>
							{headerGroup.headers.map((header) => (
								<TableHead key={header.id} className='whitespace-nowrap'>
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
									<TableCell key={cell.id} className='whitespace-nowrap'>
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
