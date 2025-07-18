import ModalAddTransaction from '@/features/transaction/components/modal-add'
import WalletSelect from '@/features/wallet/components/wallet-select'
import MonthSelect from '@/components/common/month-select'
import { cn } from '@/shared/utils'
import { api } from '@/trpc/react'

import ListTransaction from './list-transaction'
import ExpenseIncome from './expense-income'

export default function WidgetTransaction() {
  const { data, isPending } = api.transaction.readAll.useQuery({})

  return (
    <div
      className={cn(
        'relative h-full w-full rounded-lg border bg-white pt-4',
        isPending && 'pb-4',
      )}
    >
      <div className="flex items-center justify-between px-4 pb-4">
        <WalletSelect />
        <MonthSelect />
      </div>
      <ExpenseIncome isPending={isPending} data={data || []} />
      <ListTransaction isPending={isPending} data={data || []} />
      <ModalAddTransaction className="fixed right-4 bottom-4" />
    </div>
  )
}
