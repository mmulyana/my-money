'use client'

import ModalWallet from '~/features/wallet/components/modal-wallet'
import WidgetWallet from '~/features/wallet/components/widget-wallet'

export default function Page() {
  return (
    <div className="mx-auto max-w-lg">
      <WidgetWallet />
      <ModalWallet variant="add" />
    </div>
  )
}
