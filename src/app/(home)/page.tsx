import BalanceCard from '@/features/balance/components/balance-card'
import BudgetList from '@/features/budget/components/budget-list'
import BudgetRemaining from '@/features/budget/components/budget-remaining'
import TransactionTable from '@/features/transaction/components/transaction-table'
import { Sidebar } from '@/shared/components/common/sidebar'

export default function Home() {
	return (
		<div className='flex gap-4 pt-4'>
			<div className='w-[248px]'>
				<Sidebar />
			</div>
			<div className='flex-1 w-full space-y-4'>
				<BalanceCard />
				<TransactionTable />
			</div>
			<div className='w-[380px] space-y-4 pr-4'>
				<BudgetRemaining remainingBudget={140000} totalBudget={180000} />
				<BudgetList />
			</div>
		</div>
	)
}
