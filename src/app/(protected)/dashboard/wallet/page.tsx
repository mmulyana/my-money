'use client'

import WidgetWallet from '@/features/wallet/components/widget-wallet'

export default function Page() {
  return (
    <div className="mx-auto max-w-lg">
      <WidgetWallet showCreate />
    </div>
  )
}
