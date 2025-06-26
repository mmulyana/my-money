'use client'

import { api } from '~/trpc/react'
import { Skeleton } from '~/components/ui/skeleton'
import ModalWallet from './modal-wallet'

export default function CardWallet() {
  const { data, isPending } = api.wallet.readAll.useQuery()

  return (
    <div className="relative max-w-xl space-y-2.5 rounded-lg border bg-white pb-4">
      <div className="flex items-center justify-between px-4 pt-2">
        <p>Wallet</p>
        <ModalWallet variant="add" />
      </div>
      {isPending ? (
        <div className="space-y-4">
          <div className="flex justify-between">
            <Skeleton />
            <Skeleton />
          </div>
        </div>
      ) : (
        <div className="space-y-4 px-4">
          {data?.map((i) => <ModalWallet variant="edit" key={i.id} data={i} />)}
        </div>
      )}
    </div>
  )
}
