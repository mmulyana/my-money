import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { Ellipsis, Plus } from 'lucide-react'
import { useEffect, useState } from 'react'

import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogTrigger,
} from '@/components/ui/dialog'

import { transactionSchema, type TransactionFormSchema } from '../schema'
import { TransactionForm } from './form-transaction'
import { api } from '@/trpc/react'

export default function ModalEditTransaction({
  data,
}: {
  data: TransactionFormSchema & { id: string }
}) {
  const [open, setOpen] = useState(false)
  const utils = api.useUtils()

  const { data: res } = api.transaction.read.useQuery({
    id: open ? data.id : '',
  })

  const form = useForm<TransactionFormSchema>({
    resolver: zodResolver(transactionSchema),
    defaultValues: {
      amount: 0,
      type: 'EXPENSE',
    },
  })

  useEffect(() => {
    if (res && open) {
      form.reset({
        amount: res.amount,
        categoryId: res.categoryId,
        date: res.date ? new Date(res.date) : undefined,
        note: res?.note || '',
        type: res.type,
        walletId: res.walletId,
      })
    }
  }, [res])

  const create = api.transaction.update.useMutation({
    onSuccess: () => {
      utils.transaction.invalidate()
      utils.budget.invalidate()
      utils.wallet.invalidate()
      utils.category.summaryByCategory.invalidate()
      form.reset()
      setOpen(false)
    },
  })

  const category = api.category.readAll.useQuery()

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="icon" className="h-6 w-6">
          <Ellipsis />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <div className="w-full">
          <DialogTitle className="mb-4 text-xl font-semibold">
            New Transaction
          </DialogTitle>
          <TransactionForm
            form={form}
            onSubmit={(payload) => create.mutate({ ...payload, id: data?.id })}
            submitLabel="Save"
            categories={category.data || []}
            id={data.id}
          />
        </div>
      </DialogContent>
    </Dialog>
  )
}
