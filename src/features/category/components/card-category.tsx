'use client'

import { Skeleton } from '@/components/ui/skeleton'
import { api } from '@/trpc/react'

import ModalAddCategory from './modal-add-category'
import ModalEditCategory from './modal-edit-category'

export default function CardCategory() {
  const { data, isPending } = api.category.readAll.useQuery()

  return (
    <div className="relative max-w-xl space-y-2.5 rounded-lg border bg-white pb-4">
      <div className="flex items-center justify-between px-4 pt-2">
        <p>Category</p>
        <ModalAddCategory />
      </div>
      {isPending ? (
        <div className="space-y-4">
          <div className="flex justify-between">
            <Skeleton />
            <Skeleton />
          </div>
        </div>
      ) : (
        <div className="space-y-4 px-4">
          {data?.map((i) => <ModalEditCategory key={i.id} data={i} />)}
        </div>
      )}
    </div>
  )
}
