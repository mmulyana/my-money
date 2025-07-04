'use client'
import { useEffect, useState } from 'react'
import { useIconPicker } from '@/shared/hooks/use-icon-picker'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'
import { IconRenderer } from './icon-renderer'
import { Button } from '../ui/button'

export const IconPicker = ({
  defaultValue,
  onValueChange,
}: {
  defaultValue?: string
  onValueChange?: (val: string) => void
}) => {
  const [icon, setIcon] = useState<null | string>(defaultValue || 'Salad')
  const [open, setOpen] = useState(false)
  const { icons } = useIconPicker()

  useEffect(() => {
    if (typeof icon === 'string') {
      onValueChange?.(icon)
    }
  }, [icon])

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant="outline" type="button" className="h-9 w-9">
          {icon ? (
            <>
              <IconRenderer
                className="size-4 text-zinc-500"
                icon={icon as any}
              />
            </>
          ) : (
            'Select'
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent
        align="start"
        className="grid w-full max-w-sm grid-cols-8 p-0"
      >
        {Array.isArray(icons) &&
          icons?.map(({ name }) => (
            <Button
              key={name}
              variant="outline"
              onClick={() => {
                setIcon(icon === name ? null : name)
                setOpen(false)
              }}
              className="border-none"
            >
              <IconRenderer icon={name as any} />
            </Button>
          ))}
      </PopoverContent>
    </Popover>
  )
}
