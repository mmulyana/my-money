import CategoryItem from '@/features/category/components/category-item'
import type { Category, Transaction } from '@prisma/client'
import { cn, formatThousands } from '@/shared/utils'

import ModalEditTransaction from './modal-edit'

export default function TransactionItem({
  data,
}: {
  data: Transaction & { category: Category; user: { name: string } }
}) {
  return (
    <div className="flex items-center justify-between">
      <div>
        <CategoryItem
          variant="color"
          data={data.category}
          note={data?.note || ''}
          hideType
        />
      </div>
      <div className="flex items-center gap-2">
        <p className={cn(data.type === 'EXPENSE' && 'text-red-500')}>
          {formatThousands(data.amount)}
        </p>
        <ModalEditTransaction
          data={{
            ...data,
            date: data.date ? new Date(data.date) : undefined,
            note: data.note || '',
          }}
        />
      </div>
    </div>
  )
}
