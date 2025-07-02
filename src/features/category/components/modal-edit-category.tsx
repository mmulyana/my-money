'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { api } from '~/trpc/react'
import { useState } from 'react'

import { Button } from '~/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '~/components/ui/dialog'

import FormCategory from './form-category'
import { CategorySchema } from '../schema'
import type { Category } from '@prisma/client'
import CategoryItem from './category-item'

export default function ModalEditCategory({
  data,
}: {
  data: Partial<Category>
}) {
  const [open, setOpen] = useState(false)
  const utils = api.useUtils()

  const form = useForm({
    resolver: zodResolver(CategorySchema),
    defaultValues: {
      color: data.color || '',
      name: data.name || '',
    },
  })

  const create = api.category.update.useMutation({
    onSuccess: () => {
      utils.category.invalidate()
      form.reset(), setOpen(false)
    },
  })

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <CategoryItem
          as="button"
          type="button"
          className="px-2 py-1.5 hover:cursor-pointer border-transparent border hover:border-gray-200 rounded-lg"
          data={data}
        />
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="hidden"></DialogTitle>
          <DialogDescription className="hidden"></DialogDescription>
        </DialogHeader>
        <FormCategory
          form={form}
          onSubmit={(values) =>
            data.id && create.mutate({ ...values, id: data.id })
          }
          onCancel={() => setOpen(false)}
        />
      </DialogContent>
    </Dialog>
  )
}
