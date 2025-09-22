import BalanceCard from '@/features/balance/components/balance-card'
import BudgetInfo from '@/features/budget/components/budget-info'
import CashflowChart from '@/features/transaction/components/cashflow-chart'

export default function Home() {
	return (
		<div className='flex-1 w-full space-y-4'>
			<BalanceCard />
			<BudgetInfo />
			<CashflowChart />
		</div>
	)
}
