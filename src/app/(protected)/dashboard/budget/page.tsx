'use client'

import BudgetDetail from '@/features/budget/components/detail-budget'
import WidgetBudget from '@/features/budget/components/widget-budget'

export default function Page() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 max-w-[1440px] mx-auto">
      <div className="col-start-1 h-full w-full space-y-6 lg:col-start-2">
        <WidgetBudget />
      </div>

      <BudgetDetail />
    </div>
  )
}
