import { useAtom, useAtomValue } from 'jotai'
import { Trash } from 'lucide-react'
import { useMemo } from 'react'

import BarProgress from '@/components/common/bar-progress'
import { Button } from '@/components/ui/button'

import { atomBudget } from '@/shared/stores/atom-budget'
import { api } from '@/trpc/react'

import SelectBudget from './select-budget'
import { differenceInDays } from 'date-fns'
import SpendingTip from './spending-tips'
import WidgetBudget from './widget-budget'
import WidgetTransaction from '@/features/transaction/components/widget-transaction'

export default function BudgetDetail() {
  const [budgetId, setBudgetId] = useAtom(atomBudget)

  const utils = api.useUtils()
  const { data } = api.budget.readAll.useQuery()
  const { mutate: destroy } = api.budget.destroy.useMutation()

  const budget = useMemo(() => {
    if (!budgetId || budgetId === '') return
    return data?.find((i) => i.id === budgetId)
  }, [data, budgetId])

  if (!budgetId) {
    return null
  }

  return (
    <div className="h-fit w-full rounded-xl border border-[#EDEDED] bg-white">
      <div className="px-6 py-4">
        <div className="mb-4 flex items-center justify-between">
          <SelectBudget budget={budget} />
        </div>
        <BarProgress
          color={budget?.category.color || ''}
          percentage={budget?.percentage || 0}
        />
        <div className="mt-4 grid grid-cols-3">
          <div>
            <p className="text-sm text-gray-400">Budget</p>
            <p>{budget?.amount}</p>
          </div>
          <div>
            <p className="text-sm text-gray-400">Spent</p>
            <p>{(budget?.amount || 0) - (budget?.remaining || 0)}</p>
          </div>
          <div>
            <p className="text-sm text-gray-400">Remaining</p>
            <p>{budget?.remaining}</p>
          </div>
        </div>

        <div className="mt-6">
          <p className="text-sm text-gray-400">Time</p>
          <div className="flex gap-2">
            <p className="font-medium">
              {budget?.startDate &&
                budget.endDate &&
                differenceInDays(budget?.endDate, budget?.startDate)}
            </p>
          </div>
        </div>

        <div className="mt-4">
          <SpendingTip
            amount={budget?.amount || 0}
            remaining={budget?.remaining || 0}
            endDate={budget?.endDate as Date}
          />
        </div>

        <Button
          className="mt-10 h-fit !p-0 text-red-500 hover:bg-transparent hover:text-red-700"
          variant="ghost"
          size="sm"
          onClick={() =>
            budget?.id &&
            destroy(
              { id: budget?.id },
              {
                onSuccess: () => {
                  setBudgetId(null)
                  utils.budget.invalidate()
                },
              },
            )
          }
        >
          <Trash />
          Delete budget
        </Button>
      </div>
    </div>
  )
}
