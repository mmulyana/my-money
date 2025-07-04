'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { api } from '@/trpc/react'
import { useState } from 'react'

import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'

import { Plus } from 'lucide-react'
import { BudgetSchema } from '../schema'
import FormBudget from './form-budget'

export default function ModalAddBudget() {
  const [open, setOpen] = useState(false)
  const utils = api.useUtils()

  const form = useForm({
    resolver: zodResolver(BudgetSchema),
    defaultValues: {},
  })

  const create = api.budget.create.useMutation({
    onSuccess: () => {
      utils.budget.invalidate()
      form.reset(), setOpen(false)
      setOpen(false)
    },
  })

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          className="h-full w-full flex-col justify-end rounded-lg bg-transparent pb-0 shadow-none hover:bg-gray-100/40"
          variant="secondary"
        >
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gray-50 p-0 shadow-none">
            <Plus strokeWidth={3} className="h-40 w-40 stroke-gray-800" />
          </div>
          <p className="mt-3.5 mb-1 text-sm font-normal">New Budget</p>
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="hidden"></DialogTitle>
          <DialogDescription className="hidden"></DialogDescription>
        </DialogHeader>
        <FormBudget
          form={form}
          onSubmit={(values) => create.mutate(values)}
          onCancel={() => setOpen(false)}
        />
      </DialogContent>
    </Dialog>
  )
}
