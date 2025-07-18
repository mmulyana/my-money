'use client'

import CardTransaction from '@/features/transaction/components/widget-transaction'
import WidgetBudget from '@/features/budget/components/widget-budget'
import WidgetWallet from '@/features/wallet/components/widget-wallet'

export default function Page() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-[1fr_480px_480px] gap-6">
      <div className="col-start-1 h-full w-full space-y-6 lg:col-start-2">
        <WidgetBudget />
        <WidgetWallet />
      </div>
      <CardTransaction />
    </div>
  )
}
