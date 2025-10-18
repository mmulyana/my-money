"use client";

import useCalendarMonth from "@/shared/hooks/use-calendar-month";
import { useGetTransaction } from "../api/get-transaction";
import { TransactionGroup } from "./transaction-group";

export default function RecentTransaction() {
  const { monthIndex, year } = useCalendarMonth();

  const { data } = useGetTransaction({
    month: monthIndex,
    year,
    pagination: {
      limit: 10,
      page: 1,
    },
  });

  return (
    <div className="bg-white p-4 rounded-lg">
      <div className="flex justify-between items-center mb-4">
        <p className="text-[13px] font-medium text-foreground">
          Recent Transaction
        </p>
      </div>
      <div className="flex gap-4 flex-col">
        {data?.data?.map((i) => (
          <TransactionGroup
            key={i.date}
            amount={i.total}
            date={i.date}
            transactions={i.transactions}
          />
        ))}
      </div>
    </div>
  );
}
