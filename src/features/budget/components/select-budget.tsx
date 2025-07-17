'use client'

import { IconRenderer } from '@/components/common/icon-renderer'
import { Button } from '@/components/ui/button'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import CategoryItem from '@/features/category/components/category-item'
import { atomBudget } from '@/shared/stores/atom-budget'
import { cn } from '@/shared/utils'
import { api } from '@/trpc/react'
import type { Budget, Category } from '@prisma/client'
import { useSetAtom } from 'jotai'
import { Check, ChevronsUpDown } from 'lucide-react'

export default function SelectBudget({
  budget,
}: {
  budget?: Budget & { category: Category }
}) {
  const { data } = api.budget.readAll.useQuery()
  const setBudgetId = useSetAtom(atomBudget)

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="ghost" className='h-fit py-0.5 !px-0.5 pr-1 hover:bg-transparent hover:ring-1 ring-gray-100'>
          <CategoryItem
            data={budget?.category as any}
            hideType
          />

          <ChevronsUpDown className="ml-2" />
        </Button>
      </PopoverTrigger>
      <PopoverContent align='start' className='p-0 overflow-hidden w-fit'>
        <div className="flex flex-col">
          {data?.map((i) => (
            <Button
              key={i.id}
              variant="ghost"
              className='h-fit rounded-none'
              onClick={() => setBudgetId(i.id)}
            >
              <CategoryItem
                variant="default"
                data={i?.category as any}
                hideType
              />

              <Check
                className={cn(
                  'ml-auto',
                  i.id !== budget?.id && 'stroke-transparent',
                )}
              />
            </Button>
          ))}
        </div>
      </PopoverContent>
    </Popover>
  )
}
