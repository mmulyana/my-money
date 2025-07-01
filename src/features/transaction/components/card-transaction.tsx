import { format } from 'date-fns'

import TransactionItem from '~/features/transaction/components/transaction-item'
import ModalAddTransaction from '~/features/transaction/components/modal-add'
import { Skeleton } from '~/components/ui/skeleton'
import { api } from '~/trpc/react'
import WalletSelect from '~/features/wallet/components/wallet-select'
import { cn } from '~/lib/utils'
import { useMemo } from 'react'

export default function CardTransaction() {
  const { data, isPending } = api.transaction.readAll.useQuery()

  const grouped = data
    ?.filter((tx) => tx.date)
    .reduce(
      (acc, tx) => {
        const date = new Date(tx.date!).toISOString().split('T')[0]
        const existing = acc.find((g) => g.date === date)
        if (existing) {
          existing.transaction.push(tx)
          if (tx.type === 'EXPENSE') {
            existing.sum -= tx.amount
          } else {
            existing.sum += tx.amount
          }
        } else {
          acc.push({
            date: date as string,
            sum: tx.type === 'EXPENSE' ? tx.amount * -1 : tx.amount,
            transaction: [tx],
          })
        }
        return acc
      },
      [] as { date: string; sum: number; transaction: typeof data }[],
    )
    .sort((a, b) => b.date.localeCompare(a.date))

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
    <div
      className={cn(
        'relative h-full w-full rounded-lg border bg-white pt-4',
        isPending && 'pb-4',
      )}
    >
      <div className="flex items-center justify-between px-4 pb-4">
        <WalletSelect />
      </div>

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

      {!isPending ? (
        grouped?.map((group) => (
          <div key={group.date} className="mb-2 space-y-1">
            <div className="flex items-center justify-between bg-gray-100/50 px-4 py-2">
              <p className="text-sm text-gray-500">
                {format(new Date(group.date), 'MMMM dd, yyyy')}
              </p>
              <p className="text-sm text-gray-900">{group.sum.toString()}</p>
            </div>
            <div className="space-y-4 p-4">
              {group.transaction.map((tx) => (
                <TransactionItem key={tx.id} data={tx} />
              ))}
            </div>
          </div>
        ))
      ) : (
        <div className="flex flex-col gap-2 px-4">
          <Skeleton className="h-6 w-1/2 bg-gray-200" />
          <Skeleton className="h-6 w-1/4 bg-gray-200" />
          <Skeleton className="mt-4 h-6 w-1/2 bg-gray-200" />
          <Skeleton className="h-6 w-1/4 bg-gray-200" />
        </div>
      )}
      <ModalAddTransaction className="fixed right-4 bottom-4" />
    </div>
  )
}
