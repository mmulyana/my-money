import type { Category } from '@prisma/client'
import { type ElementType, type ComponentPropsWithoutRef } from 'react'
import { IconRenderer } from '@/components/common/icon-renderer'
import { cn } from '@/shared/utils'

type CategoryItemProps<T extends ElementType = 'div'> = {
  as?: T
  data: Partial<Category>
  hideType?: boolean
  note?: string
  variant?: 'default' | 'color'
  styleCategory?: {
    icon?: string
  }
} & ComponentPropsWithoutRef<T>

export default function CategoryItem<T extends ElementType = 'div'>({
  as,
  data,
  hideType = false,
  note,
  variant = 'default',
  styleCategory,
  ...props
}: CategoryItemProps<T>) {
  const { className, ...defaultProps } = props
  const Component = as || 'div'

  return (
    <Component
      className={cn(
        'flex w-full items-center justify-between gap-2',
        className,
      )}
      {...defaultProps}
    >
      <div className="flex items-center gap-2">
        <div
          className={cn(
            'relative h-10 w-10 overflow-hidden rounded-full',
            variant === 'color' && 'border',
          )}
          style={{ borderColor: variant === 'color' ? data.color : '' }}
        >
          <div
            className="h-full w-full opacity-5"
            style={{
              background: data.color,
            }}
          ></div>
          <IconRenderer
            icon={data.icon as any}
            className={cn(
              'absolute top-1/2 left-1/2 h-6 -translate-x-1/2 -translate-y-1/2',
              styleCategory?.icon,
            )}
            style={{
              color: data.color,
            }}
          />
        </div>
        <div>
          <p className="text-gray-900">{data.name || '-'}</p>
          <p className="text-sm text-gray-400">{note}</p>
        </div>
      </div>
      {!hideType && (
        <div>
          <p className="text-sm text-gray-600 capitalize">
            {data.type?.toLowerCase()}
          </p>
        </div>
      )}
    </Component>
  )
}
