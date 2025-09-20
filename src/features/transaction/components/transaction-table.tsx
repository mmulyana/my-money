'use client'

import React, { useState } from 'react'
import {
	ColumnDef,
	flexRender,
	getCoreRowModel,
	useReactTable,
} from '@tanstack/react-table'
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from '@/shared/components/ui/table'
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from '@/shared/components/ui/popover'
import { ArrowUpDown, Filter } from 'lucide-react'

const dummyData = Array.from({ length: 20 }, (_, i) => ({
	id: i + 1,
	date: `2025/09/${String((i % 30) + 1).padStart(2, '0')}`,
	category: ['Food', 'Transport', 'Shopping', 'Bills'][i % 4],
	remark: `Transaction ${i + 1}`,
	amount: (Math.random() * 100).toFixed(2),
}))

export default function TransactionTable() {
	const [page, setPage] = useState(1)
	const pageSize = 10
	const total = dummyData.length

	const columns: ColumnDef<any>[] = [
		{ accessorKey: 'date', header: 'Date' },
		{ accessorKey: 'category', header: 'Category' },
		{ accessorKey: 'remark', header: 'Remark' },
		{
			accessorKey: 'amount',
			header: () => <p className='text-right'>Amount</p>,
			cell: ({ row }) => <p className='text-right'>{row.original.amount}</p>,
		},
	]

	const pageData = dummyData.slice((page - 1) * pageSize, page * pageSize)

	const table = useReactTable({
		data: pageData,
		columns,
		getCoreRowModel: getCoreRowModel(),
		manualPagination: true,
		pageCount: Math.ceil(total / pageSize),
	})

	return (
		<div>
			<div className='mb-4'>
				<p className='font-medium text-foreground text-sm'>Transaction</p>
				<p className='text-xs text-foreground/50'>
					You have {total} transaction record this month
				</p>
			</div>

			<div className='bg-white rounded-lg px-4 pb-4'>
				<div className='py-3.5 flex justify-between items-center'>
					<div className='flex gap-4 items-center'>
						<Popover>
							<PopoverTrigger className='flex gap-1.5 items-center'>
								<Filter strokeWidth={2.5} size={16} className='text-muted-foreground' />
								<span className='text-sm text-muted-foreground'>Filter</span>
							</PopoverTrigger>
							<PopoverContent align='start' className='w-40'></PopoverContent>
						</Popover>
						<Popover>
							<PopoverTrigger className='flex gap-1.5 items-center'>
								<ArrowUpDown strokeWidth={2.5} size={16} className='text-muted-foreground' />
								<span className='text-sm text-muted-foreground'>Sort</span>
							</PopoverTrigger>
							<PopoverContent align='start' className='w-40'></PopoverContent>
						</Popover>
					</div>
				</div>
				<Table className='w-full'>
					<TableHeader>
						{table.getHeaderGroups().map((headerGroup) => (
							<TableRow className='border-none' key={headerGroup.id}>
								{headerGroup.headers.map((header) => (
									<TableHead key={header.id} className='p-2 text-left'>
										{flexRender(
											header.column.columnDef.header,
											header.getContext()
										)}
									</TableHead>
								))}
							</TableRow>
						))}
					</TableHeader>
					<TableBody>
						{table.getRowModel().rows.map((row) => (
							<TableRow key={row.id} className='border-none'>
								{row.getVisibleCells().map((cell) => (
									<TableCell key={cell.id} className='p-2'>
										{flexRender(cell.column.columnDef.cell, cell.getContext())}
									</TableCell>
								))}
							</TableRow>
						))}
					</TableBody>
				</Table>
			</div>
		</div>
	)
}
