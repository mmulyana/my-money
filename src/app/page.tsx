import BalanceCard from '@/features/balance/components/balance-card'
import BudgetRemaining from '@/features/budget/components/budget-remaining'
import TransactionTable from '@/features/transaction/components/transaction-table'

export default function Home() {
	return (
		<div className='flex gap-4 p-4'>
			<div className='w-64 flex-1'></div>
			<div className='flex-1 mx-auto max-w-2xl space-y-4'>
				<BalanceCard />
				<TransactionTable />
			</div>
			<div className='flex-1'>
				<BudgetRemaining remainingBudget={140000} totalBudget={180000} />
			</div>
		</div>
	)
}
