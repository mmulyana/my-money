'use client'

import { CheckIcon, ChevronsUpDownIcon } from 'lucide-react'

import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
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
import { useEffect, useMemo, useState } from 'react'
import { api } from '@/trpc/react'
import CategoryItem from './category-item'
import { IconRenderer } from '@/components/common/icon-renderer'

const frameworks = [
  {
    value: 'next.js',
    label: 'Next.js',
  },
  {
    value: 'sveltekit',
    label: 'SvelteKit',
  },
  {
    value: 'nuxt.js',
    label: 'Nuxt.js',
  },
  {
    value: 'remix',
    label: 'Remix',
  },
  {
    value: 'astro',
    label: 'Astro',
  },
]

export function ComboboxCategory({
  defaultValue,
  onValueChange,
}: {
  defaultValue: string
  onValueChange: (val: string) => void
}) {
  const [open, setOpen] = useState(false)
  const [value, setValue] = useState(defaultValue || '')

  const { data } = api.category.readAll.useQuery()

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
