import { atomBudget } from '@/shared/stores/atom-budget'
import { useAtom, useAtomValue } from 'jotai'
import SelectBudget from './select-budget'
import BarProgress from '@/components/common/bar-progress'
import { api } from '@/trpc/react'
import { useMemo } from 'react'
import { Button } from '@/components/ui/button'
import { Trash } from 'lucide-react'

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
    <div className="h-fit w-full rounded-xl border border-[#EDEDED] bg-white p-6">
      <div className="mb-4 flex items-center justify-between">
        <SelectBudget budget={budget} />
      </div>
      <BarProgress
        color={budget?.category.color || ''}
        percentage={budget?.percentage || 0}
      />

      <Button
        className="mt-10 text-red-500 hover:text-red-700"
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
  )
}
