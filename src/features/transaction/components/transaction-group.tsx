import TransactionItem from './transaction-item'
import { Transaction } from '../types'

type TransactionGroupProps = {
	date: string
	amount: number
	transactions: Transaction[]
}

export function TransactionGroup(props: TransactionGroupProps) {
	return (
		<div className='mb-4'>
			<div className='flex justify-between items-center mb-3'>
				<span className='text-foreground/50 text-sm'>
					{/* {format(new Date(props.date), 'dd MMM')} */}
				</span>
				<span className='text-foreground text-sm'>{props.amount}</span>
			</div>

			<div className='bg-white rounded-lg overflow-hidden group hover:bg-transparent'>
				{props.transactions?.map((t, idx) => (
					<TransactionItem
						key={t.id}
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
