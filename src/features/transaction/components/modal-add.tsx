import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { Plus } from 'lucide-react'
import { useState } from 'react'

import { Button } from '~/components/ui/button'
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogTrigger,
} from '~/components/ui/dialog'

import { transactionSchema, type TransactionFormSchema } from '../schema'
import { TransactionForm } from './form-transaction'
import { api } from '~/trpc/react'

export default function ModalAddTransaction() {
  const [open, setOpen] = useState(false)
  const utils = api.useUtils()

  const form = useForm<TransactionFormSchema>({
    resolver: zodResolver(transactionSchema),
    defaultValues: {
      amount: 0,
      type: 'EXPENSE',
    },
  })

  const create = api.transaction.create.useMutation({
    onSuccess: () => {
      utils.transaction.invalidate()
      form.reset()
      setOpen(false)
    },
  })

  const category = api.category.readAll.useQuery()

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="absolute -right-4 -bottom-4 h-10 w-10 rounded-full bg-[#31B9B5] p-0">
          <Plus />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <div className="w-full">
          <DialogTitle className="mb-4 text-xl font-semibold">
            New Transaction
          </DialogTitle>
          <TransactionForm
            form={form}
            onSubmit={(data) => create.mutate(data)}
            submitLabel="Save"
            categories={category.data || []}
          />
        </div>
      </DialogContent>
    </Dialog>
  )
}
