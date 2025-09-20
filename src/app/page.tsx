import BalanceCard from '@/features/balance/components/balance-card'

export default function Home() {
	return (
		<div className='mx-auto max-w-2xl p-4 space-y-4'>
			<BalanceCard />
			<div>
				<div>
					<p className='font-medium text-foreground text-sm'>Transaction</p>
					<p className='text-xs text-foreground/50'>
						You have 40 transaction record at this month
					</p>
				</div>
			</div>
		</div>
	)
}
