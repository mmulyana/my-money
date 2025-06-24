"use client";

import ButtonLogout from "~/features/auth/components/button-logout";
import ModalAddTransaction from "~/features/transaction/components/modal-add";
import TransactionItem from "~/features/transaction/components/transaction-item";
import { api } from "~/trpc/react";

export default function Page() {
  const { data } = api.transaction.readAll.useQuery();

  return (
    <div className="p-4">
      <div className="relative max-w-xl space-y-2.5 rounded border p-4">
        {data?.map((i) => <TransactionItem key={i.id} data={i} />)}
        <ModalAddTransaction />
      </div>
      <div>
        <ButtonLogout />
      </div>
    </div>
  );
}
