import type { Category, Transaction } from "@prisma/client";
import ModalEditTransaction from "./modal-edit";

export default function TransactionItem({
  data,
}: {
  data: Transaction & { category: Category };
}) {
  return (
    <div className="flex items-center justify-between">
      <div>
        <div className="flex items-center gap-2">
          <div
            className="h-1.5 w-1.5 rounded-full"
            style={{
              background: data?.category?.color,
            }}
          />
          <p className="text-gray-900">{data.category.name}</p>
        </div>
        <p className="pl-3.5 text-sm text-gray-500">{data?.note}</p>
      </div>
      <div className="flex items-center gap-2">
        <p>{data.amount}</p>
        <ModalEditTransaction
          data={{
            ...data,
            date: data.date ? new Date(data.date) : undefined,
            note: data.note || "",
          }}
        />
      </div>
    </div>
  );
}
