import BalanceCard from '@/features/balance/components/balance-card'
import TransactionTable from '@/features/transaction/components/transaction-table'

export default function Home() {
	return (
		<div className='mx-auto max-w-2xl p-4 space-y-4'>
			<BalanceCard />
			<TransactionTable />
		</div>
	)
}
