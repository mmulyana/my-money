'use client'

import CircularProgress from '@/components/common/circular-progress'
import { IconRenderer } from '@/components/common/icon-renderer'
import { api } from '@/trpc/react'

import ModalAddBudget from './modal-add-budget'
import { Skeleton } from '@/components/ui/skeleton'

export default function WidgetBudget() {
  const { data, isPending } = api.budget.readAll.useQuery()
  return (
    <div className="border-[#EDEDED grid grid-cols-2 gap-4 rounded-xl border bg-white p-6 lg:grid-cols-3">
      {isPending ? (
        <>
          <Skeleton className="h-36 w-full bg-gray-200" />
          <Skeleton className="h-36 w-full bg-gray-200" />
        </>
      ) : (
        data?.map((i) => (
          <div
            key={i.id}
            className="flex flex-col items-center space-y-2 rounded-lg pb-1 hover:bg-gray-100/60"
          >
            <CircularProgress
              color={i.category.color}
              progress={i.percentage}
              icon={<IconRenderer icon={i.category.icon as any} />}
              size={110}
              strokeWidth={8}
              className="p-6"
            />
            <p className="z-10 -mt-3.5 text-sm">{i.category.name}</p>
          </div>
        ))
      )}

      <ModalAddBudget />
    </div>
  )
}
