'use client'

import CardTransaction from '@/features/transaction/components/widget-transaction'
import WidgetBudget from '@/features/budget/components/widget-budget'
import WidgetWallet from '@/features/wallet/components/widget-wallet'

export default function Page() {
  return (
    <div className="flex justify-center gap-6 flex-col md:flex-row pl-0 lg:pl-[200px]">
      <div className="h-full space-y-6">
        <WidgetBudget />
        <WidgetWallet />
      </div>
      <CardTransaction />
    </div>
  )
}
