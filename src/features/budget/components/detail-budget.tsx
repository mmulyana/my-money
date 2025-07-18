import { Ellipsis, Pencil, Trash } from 'lucide-react'
import { differenceInDays } from 'date-fns'
import { useAtom } from 'jotai'
import { useMemo } from 'react'

import BarProgress from '@/components/common/bar-progress'
import { Button, buttonVariants } from '@/components/ui/button'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'

import { atomBudget } from '@/shared/stores/atom-budget'
import { api } from '@/trpc/react'

import SheetTransaction from './sheet-transaction'
import SelectBudget from './select-budget'
import SpendingTip from './spending-tips'
import ModalEditBudget from './modal-edit-budget'

export default function BudgetDetail() {
  const [budgetId, setBudgetId] = useAtom(atomBudget)

  const utils = api.useUtils()
  const { data: budgets } = api.budget.readAll.useQuery()
  const { mutate: destroy } = api.budget.destroy.useMutation()

  const budget = useMemo(() => {
    return budgets?.find((b) => b.id === budgetId)
  }, [budgets, budgetId])

  if (!budget) return null

  return (
    <div className="relative h-fit w-full rounded-xl border border-[#EDEDED] bg-white">
      <div className="px-6 py-4">
        <SelectBudget budget={budget} />
        <Popover>
          <PopoverTrigger
            className={buttonVariants({
              variant: 'ghost',
              size: 'icon',
              className: 'absolute top-2 right-2',
            })}
          >
            <Ellipsis />
          </PopoverTrigger>
          <PopoverContent
            align="end"
            className="flex w-fit flex-col overflow-hidden !p-0"
          >
            <ModalEditBudget id={budgetId as string}>
              <Button
                variant="ghost"
                size="sm"
                className="w-full justify-start !rounded-none"
              >
                <Pencil />
                Edit
              </Button>
            </ModalEditBudget>
            <Button
              variant="ghost"
              size="sm"
              className="justify-start !rounded-none text-red-500 hover:text-red-700"
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
          </PopoverContent>
        </Popover>
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

        <div className="mt-4 mb-6">
          <SpendingTip
            amount={budget?.amount || 0}
            remaining={budget?.remaining || 0}
            endDate={budget?.endDate as Date}
          />
        </div>

        <SheetTransaction />
      </div>
    </div>
  )
}
