import SpendingCategoryCard from '@/features/transaction/components/spending-category-card'
import DailyExpenseCard from '@/features/transaction/components/daily-expense-card'
import BalanceMonthCard from '@/features/balance/components/balance-month-card'
import BalanceTotalCard from '@/features/balance/components/balance-total-card'
import BudgetInfo from '@/features/budget/components/budget-info'
import RecentTransaction from '@/features/transaction/components/recent-transaction'

export default function Home() {
	return (
		<div className='flex gap-4'>
			<div className='flex-1 space-y-4'>
				<BalanceTotalCard />
				<BalanceMonthCard />
				<RecentTransaction />
			</div>
			<div className='flex-1 space-y-4'>
				<BudgetInfo />
				<DailyExpenseCard />
				<SpendingCategoryCard />
			</div>
		</div>
	)
}
