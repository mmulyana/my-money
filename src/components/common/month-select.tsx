import { CalendarDays, ChevronsUpDown } from 'lucide-react'
import { useState } from 'react'
import { useAtom } from 'jotai'

import { currentMonthAtom } from '@/shared/stores/atom-date'
import { getMonths } from '@/shared/helper/month'

import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'
import { Button } from '../ui/button'
import { cn } from '@/shared/utils'

export default function MonthSelect() {
  const [month, setMonth] = useAtom(currentMonthAtom)
  const [open, setOpen] = useState(false)
  const months = getMonths()

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant="outline" className="h-8 bg-white !px-2 shadow-none">
          <CalendarDays />
          {months.find((i) => i.value === month)?.label}
          <ChevronsUpDown />
        </Button>
      </PopoverTrigger>
      <PopoverContent align="end" className="max-w-[180px] p-0.5">
        {months.map((i) => (
          <Button
            key={i.value}
            variant="secondary"
            className={cn(
              'w-full bg-white hover:bg-gray-100',
              i.value === new Date().getMonth() + 1 && 'border',
            )}
            onClick={() => {
              setMonth(i.value)
              setOpen(false)
            }}
          >
            {i.label}
          </Button>
        ))}
      </PopoverContent>
    </Popover>
  )
}
