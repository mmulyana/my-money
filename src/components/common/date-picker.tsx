'use client'

import { Calendar as CalendarIcon } from 'lucide-react'
import { format } from 'date-fns'

import { Calendar } from '@/components/ui/calendar'
import { Button } from '@/components/ui/button'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { cn } from '@/lib/utils'
import { useState } from 'react'

type props = {
  defaultValue?: Date
  onValueChange?: (date: Date | undefined) => void
  placeholder?: string
}

export function DatePicker({
  defaultValue,
  onValueChange,
  placeholder = 'Select date',
}: props) {
  const [date, setDate] = useState<Date | undefined>(defaultValue)

  const handleChange = (selectedDate: Date | undefined) => {
    setDate(selectedDate)
    onValueChange?.(selectedDate)
  }

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className={cn(
            'w-full justify-start text-left font-normal',
            !date && 'text-muted-foreground',
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {date ? format(date, 'PPP') : <span>{placeholder}</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <Calendar mode="single" selected={date} onSelect={handleChange} />
      </PopoverContent>
    </Popover>
  )
}
