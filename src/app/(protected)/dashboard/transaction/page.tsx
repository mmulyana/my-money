'use client'

import WidgetTransaction from '@/features/transaction/components/widget-transaction'
import WidgetCategory from '@/features/category/components/widget-category'

export default function Page() {
  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1fr_480px_480px]">
      <div className="col-start-1 h-full w-full space-y-6 lg:col-start-2">
        <WidgetTransaction />
      </div>
      <WidgetCategory />
    </div>
  )
}
