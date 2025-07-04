import type { Category, Transaction } from '@prisma/client'
import ModalEditTransaction from './modal-edit'
import { cn } from '@/lib/utils'
import { IconRenderer } from '@/components/common/icon-renderer'

export default function TransactionItem({
  data,
}: {
  data: Transaction & { category: Category; user: { name: string } }
}) {
  return (
    <div className="flex items-center justify-between">
      <div>
        <div className="flex items-center gap-2">
          <div
            className="flex h-7 w-7 items-center justify-center rounded-full"
            style={{
              background: data?.category?.color,
            }}
          >
            <IconRenderer icon="AArrowDown" />
          </div>
          <p className="text-gray-900">{data.category.name}</p>
        </div>
        <p className="pl-3.5 text-sm text-gray-500">{data?.note}</p>
      </div>
      <div className="flex items-center gap-2">
        <p className={cn(data.type === 'EXPENSE' && 'text-red-500')}>
          {data.amount}
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
