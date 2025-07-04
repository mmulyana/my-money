import { CheckIcon, ChevronsUpDownIcon } from 'lucide-react'
import { useEffect, useState } from 'react'
import { api } from '@/trpc/react'

import { Skeleton } from '@/components/ui/skeleton'
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
import { cn } from '@/shared/utils'

export default function WalletSelect({
  value,
  setValue,
}: {
  value?: string
  setValue?: (val: string) => void
}) {
  const [open, setOpen] = useState(false)
  const [wallet, setWallet] = useState(value || '')

  const { data, isPending } = api.wallet.readAll.useQuery()

  useEffect(() => {
    if (wallet === '' && data && data?.length > 0) {
      setWallet(data[0]?.id as string)
    }
    if (wallet !== '') {
      setValue?.(wallet)
    }
  }, [wallet, data])

  if (isPending) {
    return <Skeleton className="h-8 w-20 bg-gray-200" />
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          className="h-8 w-fit justify-between bg-white shadow-none"
        >
          {wallet ? data?.find((i) => i.id === wallet)?.name : 'Select...'}
          <ChevronsUpDownIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput placeholder="Search..." />
          <CommandList>
            <CommandEmpty>No wallet found.</CommandEmpty>
            <CommandGroup>
              {data?.map((i) => (
                <CommandItem
                  key={i.id}
                  value={i.id}
                  onSelect={(val) => {
                    setWallet(val)
                    setOpen(false)
                  }}
                >
                  <CheckIcon
                    className={cn(
                      'mr-2 h-4 w-4',
                      wallet === i.id ? 'opacity-100' : 'opacity-0',
                    )}
                  />
                  {i.name}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
