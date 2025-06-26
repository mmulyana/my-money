import type { Category } from '@prisma/client'
import { type ElementType, type ComponentPropsWithoutRef } from 'react'
import { cn } from '~/lib/utils'

type CategoryItemProps<T extends ElementType = 'div'> = {
  as?: T
  data: Partial<Category>
} & ComponentPropsWithoutRef<T>

export default function CategoryItem<T extends ElementType = 'div'>({
  as,
  data,
  ...props
}: CategoryItemProps<T>) {
  const { className, ...defaultProps } = props
  const Component = as || 'div'

  return (
    <Component
      className={cn('flex items-center gap-2', className)}
      {...defaultProps}
    >
      <div
        className="h-1.5 w-1.5 rounded-full"
        style={{
          background: data.color,
        }}
      />
      <p className="text-gray-900">{data.name}</p>
    </Component>
  )
}
