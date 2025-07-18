'use client'

import BudgetDetail from '@/features/budget/components/detail-budget'
import WidgetBudget from '@/features/budget/components/widget-budget'

export default function Page() {
  return (
    <div className="mx-auto max-w-[480px] space-y-6">
        <WidgetBudget />
        <BudgetDetail />
    </div>
  )
}
