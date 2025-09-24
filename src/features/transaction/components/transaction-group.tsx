import TransactionItem from './transaction-item'
import { Transaction } from '../types'
import { cn } from '@/shared/lib/utils'

type TransactionGroupProps = {
	date: string
	amount: number
	transactions: Transaction[]
}

export function TransactionGroup(props: TransactionGroupProps) {
	return (
		<div className='mb-4'>
			<div className='flex justify-between items-center mb-3'>
				<span className='text-foreground/50 text-sm'>{props.date}</span>
				<span
					className={cn(
						'text-foreground text-sm',
						props.amount < 1 && 'text-red-500'
					)}
				>
					{props.amount}
				</span>
			</div>

			<div className='bg-white rounded-lg overflow-hidden group hover:bg-transparent'>
				{props.transactions?.map((t, idx) => (
					<TransactionItem
						key={t.id}
						id={t.id}
						categoryId={t.categoryId}
						date={t.date}
						walletId={t.walletId}
						amount={t.amount}
						remark={t.remark}
						category={t.category}
						type={t.type}
						border={idx < props.transactions.length - 1}
					/>
				))}
			</div>
		</div>
	)
}
