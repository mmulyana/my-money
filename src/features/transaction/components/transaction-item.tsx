import { IconChevronRight } from '@tabler/icons-react'
import React from 'react'

import { cn } from '@/shared/lib/utils'
import { Transaction } from '../types'
import TransactionForm from './transaction-form'

export default function TransactionItem(
	props: Partial<Transaction> & { border: boolean }
) {
	return (
		<TransactionForm data={props}>
			<div
				className={cn(
					'flex items-center justify-between py-3 px-4 group cursor-pointer group-hover:bg-muted-foreground/10 hover:bg-white',
					props.border && 'border-b border-border'
				)}
			>
				<div className='flex items-center gap-2 basis-[120px] shrink-0 flex-2'>
					<span
						className='w-1.5 h-1.5 rounded-full shrink-0'
						style={{ backgroundColor: props?.category?.color }}
					></span>
					<span className='text-sm text-foreground'>
						{props?.category?.name}
					</span>
				</div>
				<div className='w-[200px] flex justify-between shrink-0'>
					<span className='text-gray-500 text-sm'>{props.remark}</span>
				</div>

				<div className='flex items-center justify-end gap-2.5 basis-[148px] flex-2'>
					<span
						className={cn(
							'text-sm',
							props?.type && props?.type === 'income'
								? 'text-foreground'
								: 'text-red-500'
						)}
					>
						{props?.amount}
					</span>
					<button className='h-5 w-5 flex justify-center text-foreground/50 items-center cursor-pointer rounded'>
						<IconChevronRight size={18} />
					</button>
				</div>
			</div>
		</TransactionForm>
	)
}
