'use client'

import { Wallet } from 'lucide-react'
import { api } from '~/trpc/react'

export default function WidgetWallet() {
  const { data } = api.wallet.readAll.useQuery()
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
          </div>
        ))}
      </div>
    </div>
  )
}
