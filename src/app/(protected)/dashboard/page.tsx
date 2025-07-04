'use client'

import CardTransaction from '@/features/transaction/components/widget-transaction'
import WidgetBudget from '@/features/budget/components/widget-budget'
import WidgetWallet from '@/features/wallet/components/widget-wallet'

export default function Page() {
  return (
    <div className="grid h-full grid-cols-1 gap-6 pr-4 pl-4 md:grid-cols-2 md:pr-10 md:pl-[320px]">
      <div className="h-full space-y-6">
        <WidgetBudget />
        <WidgetWallet />
      </div>
      <CardTransaction />
    </div>
  )
}
