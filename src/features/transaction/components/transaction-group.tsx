import { Transaction } from '../types'
import TransactionItem from './transaction-item'

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
				<span className='text-foreground text-sm'>
					Rp {props.amount}
				</span>
			</div>

			<div className='bg-white rounded-lg overflow-hidden'>
				{props.transactions.map((t, idx) => (
					<TransactionItem
						key={idx}
						amount={t.amount}
						remark={t.remark}
						category={t.category}
						border={idx < props.transactions.length - 1}
					/>
				))}
			</div>
		</div>
	)
}
