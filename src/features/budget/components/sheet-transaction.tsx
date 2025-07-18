import { buttonVariants } from '@/components/ui/button'
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'
import ListTransaction from '@/features/transaction/components/list-transaction'
import { atomBudget } from '@/shared/stores/atom-budget'
import { api } from '@/trpc/react'
import { useAtom } from 'jotai'
import { useMemo } from 'react'

export default function SheetTransaction() {
  const [budgetId] = useAtom(atomBudget)

  const { data: budgets } = api.budget.readAll.useQuery()

  const budget = useMemo(() => {
    return budgets?.find((b) => b.id === budgetId)
  }, [budgets, budgetId])

  const { data: transactions, isPending } = api.transaction.readAll.useQuery(
    {
      categoryId: budget?.categoryId ?? '-',
    },
    {
      enabled: !!budget?.categoryId,
    },
  )
  return (
    <Sheet>
      <SheetTrigger className={buttonVariants({ variant: 'ghost' })}>
        See Transactions
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Transaction</SheetTitle>
        </SheetHeader>
        <ListTransaction data={transactions || []} isPending={isPending} />
      </SheetContent>
    </Sheet>
  )
}
