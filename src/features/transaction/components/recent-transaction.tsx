"use client";

import { IconPlus } from "@tabler/icons-react";

import useCalendarMonth from "@/shared/hooks/use-calendar-month";
import { Button } from "@/shared/components/ui/button";

import { useGetTransaction } from "../api/get-transaction";
import { TransactionGroup } from "./transaction-group";
import TransactionForm from "./transaction-form";

export default function RecentTransaction() {
  const { monthIndex, year } = useCalendarMonth();

  const { data } = useGetTransaction({
    month: monthIndex,
    year,
    pagination: {
      limit: 5,
      page: 1,
    },
  });

  return (
    <div className="bg-white p-4 lg:rounded-lg">
      <div className="flex justify-between items-center mb-4">
        <p className="text-[13px] font-medium text-foreground">
          Recent Transaction
        </p>
        <TransactionForm>
          <Button
            variant={"ghost"}
            className="h-fit py-0.5 font-normal rounded gap-1 !px-1"
          >
            <IconPlus strokeWidth={2.5} />
            New Transaction
          </Button>
        </TransactionForm>
      </div>
      <div className="space-y-5">
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
