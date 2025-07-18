import { Skeleton } from '@/components/ui/skeleton'
import { cn, formatThousands } from '@/shared/utils'
import type { Category, Transaction } from '@prisma/client'
import { format } from 'date-fns'
import TransactionItem from './transaction-item'

type Transactions = Transaction & {
  category: Category
  user: {
    name: string
  }
}

export default function ListTransaction({
  isPending,
  data,
}: {
  isPending?: boolean
  data: Transactions[]
}) {
  const grouped = data
    ?.filter((tx) => tx.date)
    .reduce(
      (acc, tx) => {
        const date = new Date(tx.date!).toString()
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

  if (isPending) {
    return (
      <div className="flex flex-col gap-2 px-4">
        <Skeleton className="h-6 w-1/2 bg-gray-200" />
        <Skeleton className="h-6 w-1/4 bg-gray-200" />
        <Skeleton className="mt-4 h-6 w-1/2 bg-gray-200" />
        <Skeleton className="h-6 w-1/4 bg-gray-200" />
      </div>
    )
  }

  const renderList = () => {
    return grouped?.map((group) => (
      <div key={group.date} className="mb-2 space-y-1">
        <div className="flex items-center justify-between bg-gray-100 px-4 py-2">
          <p className="text-sm text-gray-500">
            {format(new Date(group.date), 'MMMM dd, yyyy')}
          </p>
          <p
            className={cn(
              'text-sm text-gray-900',
              group.sum < 1 && 'text-red-500',
            )}
          >
            {formatThousands(group.sum)}
          </p>
        </div>
        <div className="space-y-4 p-4">
          {group.transaction.map((tx) => (
            <TransactionItem key={tx.id} data={tx} />
          ))}
        </div>
      </div>
    ))
  }

  return <>{renderList()}</>
}
