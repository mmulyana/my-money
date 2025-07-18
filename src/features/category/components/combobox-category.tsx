'use client'

import { CheckIcon, ChevronsUpDownIcon } from 'lucide-react'
import { useEffect, useMemo, useState } from 'react'

import { Button } from '@/components/ui/button'
import { cn } from '@/shared/utils'
import { api } from '@/trpc/react'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'

import CategoryItem from './category-item'

export function ComboboxCategory({
  defaultValue,
  onValueChange,
}: {
  defaultValue: string
  onValueChange: (val: string) => void
}) {
  const [open, setOpen] = useState(false)
  const [value, setValue] = useState('')

  const { data } = api.category.readAll.useQuery()

  useEffect(() => {
    if (defaultValue) {
      setValue(defaultValue)
    }
  }, [])

  useEffect(() => {
    if (value !== '') onValueChange(value)
  }, [value])

  const selectedIcon = useMemo(() => {
    if (!data || value == '') return 0
    return data.find((i) => i.id === value)
  }, [value, data])

  return (
    <Popover open={open} onOpenChange={setOpen} modal>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className={cn('h-fit w-full justify-between py-2 shadow-none')}
        >
          {selectedIcon ? <CategoryItem data={selectedIcon} /> : 'Select'}
          <ChevronsUpDownIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent align="start" className="w-full p-0">
        <Command>
          <CommandInput placeholder="Search category..." />
          <CommandList>
            <CommandEmpty>No category found.</CommandEmpty>
            <CommandGroup>
              {data?.map((i) => (
                <CommandItem
                  key={i.id}
                  value={i.id}
                  onSelect={(currentValue) => {
                    setValue(currentValue === value ? '' : currentValue)
                    setOpen(false)
                  }}
                >
                  <CategoryItem data={i} />
                  <CheckIcon
                    className={cn(
                      'ml-auto h-4 w-4',
                      value === i.id ? 'opacity-100' : 'opacity-0',
                    )}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
