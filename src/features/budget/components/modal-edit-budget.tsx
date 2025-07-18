'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { api } from '@/trpc/react'
import React, { useEffect, useState } from 'react'

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

export default function ModalEditBudget({
  id,
  children,
}: React.PropsWithChildren & { id: string }) {
  const [open, setOpen] = useState(false)

  const utils = api.useUtils()
  const { data } = api.budget.read.useQuery(
    {
      id,
    },
    {
      enabled: id !== null && id !== undefined && id !== '',
    },
  )

  const form = useForm({
    resolver: zodResolver(BudgetSchema),
    defaultValues: {
      amount: 0,
      categoryId: '',
      endDate: undefined,
      startDate: undefined,
    },
  })

  useEffect(() => {
    if (data) {
      // form.setValue('categoryId', data.categoryId)
      // form.setValue('amount', data.amount)
      // form.setValue('startDate', new Date(data.startDate))
      // form.setValue('endDate', new Date(data.endDate))
      form.reset({
        categoryId: data.categoryId,
        amount: data.amount,
        endDate: new Date(data.endDate),
        startDate: new Date(data.startDate),
      })
    }
  }, [data])

  const update = api.budget.update.useMutation({
    onSuccess: () => {
      utils.budget.invalidate()
      form.reset(), setOpen(false)
      setOpen(false)
    },
  })

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="hidden"></DialogTitle>
          <DialogDescription className="hidden"></DialogDescription>
        </DialogHeader>
        <FormBudget
          form={form}
          onSubmit={(values) => update.mutate({ ...values, id })}
          onCancel={() => setOpen(false)}
        />
      </DialogContent>
    </Dialog>
  )
}
