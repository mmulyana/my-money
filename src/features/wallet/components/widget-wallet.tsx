'use client'

import { Wallet } from 'lucide-react'
import { useAtomValue } from 'jotai'
import { api } from '@/trpc/react'

import { currentMonthAtom, currentYearAtom } from '@/shared/stores/atom-date'
import { Skeleton } from '@/components/ui/skeleton'
import ModalWallet from './modal-wallet'

export default function WidgetWallet({
  showCreate = false,
}: {
  showCreate?: boolean
}) {
  const month = useAtomValue(currentMonthAtom)
  const year = useAtomValue(currentYearAtom)

  const { data, isPending } = api.wallet.readAllWithTotal.useQuery(
    {
      month,
      year,
    },
    {
      enabled: !!month && !!year,
    },
  )

  return (
    <div className="rounded-xl border bg-white px-6 pt-5 pb-6">
      <div className="flex items-center justify-between">
        <p className="text-gray-800">My Wallets</p>
        {showCreate && <ModalWallet variant="add" />}
      </div>

      <div className="mt-4 space-y-2">
        {isPending ? (
          <>
            <div className="flex w-full justify-between">
              <Skeleton className="h-6 w-20 bg-gray-200" />
              <Skeleton className="h-6 w-10 bg-gray-200" />
            </div>
            <div className="flex w-full justify-between">
              <Skeleton className="h-6 w-20 bg-gray-200" />
              <Skeleton className="h-6 w-10 bg-gray-200" />
            </div>
          </>
        ) : (
          data?.map((i) => (
            <div key={i.id} className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-md bg-gray-200">
                  <Wallet className="text-gray-800" />
                </div>
                <p>{i.name}</p>
              </div>
              <p>{i.total[0]?.total}</p>
            </div>
          ))
        )}
      </div>
    </div>
  )
}
