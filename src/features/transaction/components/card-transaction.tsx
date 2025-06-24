import { format } from "date-fns";

import TransactionItem from "~/features/transaction/components/transaction-item";
import ModalAddTransaction from "~/features/transaction/components/modal-add";
import { Skeleton } from "~/components/ui/skeleton";
import { api } from "~/trpc/react";

export default function CardTransaction() {
  const { data, isPending } = api.transaction.readAll.useQuery();

  const grouped = data
    ?.filter((tx) => tx.date)
    .reduce(
      (acc, tx) => {
        const date = new Date(tx.date!).toISOString().split("T")[0];
        const existing = acc.find((g) => g.date === date);
        if (existing) {
          existing.transaction.push(tx);
          if (tx.type === "EXPENSE") {
            existing.sum -= tx.amount;
          } else {
            existing.sum += tx.amount;
          }
        } else {
          acc.push({
            date: date as string,
            sum: tx.type === "EXPENSE" ? tx.amount * -1 : tx.amount,
            transaction: [tx],
          });
        }
        return acc;
      },
      [] as { date: string; sum: number; transaction: typeof data }[],
    )
    .sort((a, b) => b.date.localeCompare(a.date));

  return (
    <div className="relative max-w-xl space-y-2.5 rounded-lg border">
      <div className="flex items-center justify-between px-4 pt-2">
        <p>Transaction</p>
      </div>

      {!isPending ? (
        grouped?.map((group) => (
          <div key={group.date} className="mb-2 space-y-1">
            <div className="flex items-center justify-between bg-gray-100/50 px-4 py-2">
              <p className="text-sm text-gray-500">
                {format(new Date(group.date), "MMMM dd, yyyy")}
              </p>
              <p className="text-sm text-gray-900">{group.sum.toString()}</p>
            </div>
            <div className="space-y-4 p-4">
              {group.transaction.map((tx) => (
                <TransactionItem key={tx.id} data={tx} />
              ))}
            </div>
          </div>
        ))
      ) : (
        <div className="flex flex-col gap-2 px-4">
          <Skeleton className="h-6 w-1/2 bg-gray-200" />
          <Skeleton className="h-6 w-1/4 bg-gray-200" />
          <Skeleton className="mt-4 h-6 w-1/2 bg-gray-200" />
          <Skeleton className="h-6 w-1/4 bg-gray-200" />
        </div>
      )}
      <ModalAddTransaction />
    </div>
  );
}
