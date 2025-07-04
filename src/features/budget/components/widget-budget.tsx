'use client'

import { BatteryCharging, Bed, Car, Hamburger } from 'lucide-react'
import CircularProgress from '@/components/common/circular-progress'
import ModalAddBudget from './modal-add-budget'
import { api } from '@/trpc/react'
import { IconRenderer } from '@/components/common/icon-renderer'

export default function WidgetBudget() {
  const { data } = api.budget.readAll.useQuery()
  return (
    <div className="border-[#EDEDED grid grid-cols-2 gap-4 rounded-xl border bg-white p-6 lg:grid-cols-3">
      {data?.map((i) => (
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
      ))}

      <ModalAddBudget />
    </div>
  )
}
