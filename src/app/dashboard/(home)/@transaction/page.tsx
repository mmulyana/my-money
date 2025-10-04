'use client'

import TransactionForm from '@/features/transaction/components/transaction-form'
import { Button } from '@/shared/components/ui/button'
import { Plus } from 'lucide-react'

export default function Transaction() {
	return (
		<div>
			<TransactionForm>
				<Button
					suppressHydrationWarning
					className='fixed bottom-6 right-6 rounded-full !p-0 w-16 md:h-10 h-16 md:w-10'
				>
					<Plus size={32} strokeWidth={3} />
				</Button>
			</TransactionForm>
		</div>
	)
}
