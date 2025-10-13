'use client'

import SpendingCategoryCard from '@/features/transaction/components/spending-category-card'
import DailyExpenseCard from '@/features/transaction/components/daily-expense-card'
import BalanceMonthCard from '@/features/balance/components/balance-month-card'
import BalanceTotalCard from '@/features/balance/components/balance-total-card'
import BudgetInfo from '@/features/budget/components/budget-info'
import RecentTransaction from '@/features/transaction/components/recent-transaction'
import { useCallbackOauth } from '@/features/auth/hooks/use-callback-oauth'

export default function Home() {
	useCallbackOauth()

	return (
		<div className='flex gap-4 flex-col md:flex-row'>
			<div className='flex-1 space-y-4'>
				{/* <BalanceTotalCard /> */}
				<BalanceMonthCard />
				<DailyExpenseCard />
			</div>
			<div className='flex-1 space-y-4'>
				<BudgetInfo />
				<SpendingCategoryCard />
			</div>
		</div>
	)
}
