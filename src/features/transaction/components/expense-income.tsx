import { Skeleton } from '@/components/ui/skeleton'
import type { Transaction } from '@prisma/client'
import { useMemo } from 'react'

export default function ExpenseIncome({
  isPending,
  data,
}: {
  isPending: boolean
  data: Transaction[]
}) {
  const { incomeTotal, expenseTotal } = useMemo(() => {
    const totals = { incomeTotal: 0, expenseTotal: 0 }

    if (!data) return totals

    for (const tx of data) {
      if (!tx.date) continue

      if (tx.type === 'INCOME') {
        totals.incomeTotal += tx.amount
      } else if (tx.type === 'EXPENSE') {
        totals.expenseTotal += tx.amount
      }
    }

    return totals
  }, [data])

  return (
    <div className="mb-4 flex items-center justify-between gap-6 px-4">
      <div className="flex-1 rounded-md border p-2 px-3">
        <div className="flex items-center gap-2">
          <div className="h-2 w-2 rounded-full bg-teal-600" />
          <p className="text-gray-500">Income</p>
        </div>
        {isPending ? (
          <Skeleton className="h-6 bg-gray-200" />
        ) : (
          <p className="text-lg font-medium">{incomeTotal}</p>
        )}
      </div>
      <div className="flex-1 rounded-md border p-2 px-3">
        <div className="flex items-center gap-2">
          <div className="h-2 w-2 rounded-full bg-red-600" />
          <p className="text-gray-500">Income</p>
        </div>
        {isPending ? (
          <Skeleton className="h-6 bg-gray-200" />
        ) : (
          <p className="text-lg font-medium">{expenseTotal}</p>
        )}{' '}
      </div>
    </div>
  )
}
