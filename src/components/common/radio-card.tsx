import React from 'react'
import { cn } from '~/lib/utils'

type props = {
  value: string
  title: string
  description?: string
  icon?: React.ReactNode
  selected: boolean
  onSelect: (value: string) => void
  style?: {
    radio?: string
  }
}

export default function RadioCard(props: props) {
  const { value, title, description, icon, selected, onSelect, style } = props

  return (
    <div
      onClick={() => onSelect(value)}
      className={cn(
        'relative flex w-full cursor-pointer items-start gap-2 rounded-lg border p-2 transition duration-200',
        selected ? 'border-blue-500' : 'border-gray-300 hover:border-blue-400',
      )}
    >
      {icon && icon}

      <div className="flex flex-col">
        <p>{title}</p>
        {description && <p className="text-sm text-gray-600">{description}</p>}
      </div>

      <div className="absolute top-1/2 right-2 ml-auto -translate-y-1/2">
        <div
          className={cn(
            'flex h-4.5 w-4.5 items-center justify-center rounded-full border-2',
            selected ? 'border-blue-500' : 'border-gray-400',
            style?.radio,
          )}
        >
          {selected && <div className="h-2.5 w-2.5 rounded-full bg-blue-500" />}
        </div>
      </div>
    </div>
  )
}
