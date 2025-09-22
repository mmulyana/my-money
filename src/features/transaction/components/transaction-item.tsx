import React from 'react'
import { Transaction } from '../types'
import { cn } from '@/shared/lib/utils'
import { IconChevronRight } from '@tabler/icons-react'

export default function TransactionItem(
	props: Transaction & { border: boolean }
) {
	return (
		<div
			className={cn(
				'flex items-center justify-between py-3 px-4 hover:bg-gray-200/20 group',
				props.border && 'border-b border-border'
			)}
		>
			<div className='flex items-center gap-2 basis-[120px] flex-2'>
				<span
					className='w-1.5 h-1.5 rounded-full'
					style={{ backgroundColor: props.category.color }}
				></span>
				<span className='text-sm text-foreground'>{props.category.name}</span>
			</div>
			<div className='w-[200px] flex justify-between shrink-0'>
				<span className='text-gray-500 text-sm'>{props.remark}</span>
			</div>

			<div className='flex items-center justify-end gap-2.5 basis-[148px] flex-2'>
				<span
					className={cn(
						'text-sm',
						props.amount > 0 ? 'text-foreground' : 'text-red-500'
					)}
				>
					Rp {props.amount.toLocaleString('id-ID')}
				</span>
				<button className='h-5 w-5 flex justify-center text-foreground/50 group-hover:text-foreground items-center group-hover:scale-110 transition-all ease-in duration-200 cursor-pointer rounded'>
					<IconChevronRight size={18} />
				</button>
			</div>
		</div>
	)
}
