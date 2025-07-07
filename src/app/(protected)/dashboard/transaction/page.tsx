'use client'

import WidgetTransaction from '@/features/transaction/components/widget-transaction'
import WidgetCategory from '@/features/category/components/widget-category'

export default function Page() {
  return (
    <div className="flex flex-col justify-center gap-6 md:flex-row">
      <WidgetTransaction />
      <WidgetCategory />
    </div>
  )
}
