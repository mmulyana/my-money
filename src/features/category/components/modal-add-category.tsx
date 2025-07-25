'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { useState } from 'react'

import { api } from '@/trpc/react'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'

import FormCategory from './form-category'
import { CategorySchema } from '../schema'
import { Plus } from 'lucide-react'

export default function ModalAddCategory() {
  const [open, setOpen] = useState(false)
  const utils = api.useUtils()

  const form = useForm({
    resolver: zodResolver(CategorySchema),
    defaultValues: {
      color: '#7C3AED',
      name: '',
      icon: 'Salad',
    },
  })

  const create = api.category.create.useMutation({
    onSuccess: () => {
      utils.category.invalidate()
      form.reset(), setOpen(false)
    },
  })

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="h-8 py-0" variant="secondary">
          <Plus />
          New
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="hidden"></DialogTitle>
          <DialogDescription className="hidden"></DialogDescription>
        </DialogHeader>
        <FormCategory
          form={form}
          onSubmit={(values) => create.mutate(values)}
          onCancel={() => setOpen(false)}
        />
      </DialogContent>
    </Dialog>
  )
}
