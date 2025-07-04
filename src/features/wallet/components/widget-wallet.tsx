'use client'

import { useAtomValue } from 'jotai'
import { Wallet } from 'lucide-react'
import { currentMonthAtom, currentYearAtom } from '@/shared/stores/atom-date'
import { api } from '@/trpc/react'

export default function WidgetWallet() {
  const month = useAtomValue(currentMonthAtom)
  const year = useAtomValue(currentYearAtom)

  const { data } = api.wallet.readAllWithTotal.useQuery(
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
      <p className="text-gray-800">My Wallets</p>
      <div className="mt-4 space-y-2">
        {data?.map((i) => (
          <div key={i.id} className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-md bg-gray-200">
                <Wallet className="text-gray-800" />
              </div>
              <p>{i.name}</p>
            </div>
            <p>{i.total[0]?.total}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
