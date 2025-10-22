import { ArrowDownRight, ArrowUpRight } from "lucide-react";
import { useGetMonthlySummary } from "../api/get-monthly-summary";
import { useState } from "react";

export default function TransactionSummary() {
  const [year] = useState(new Date().getFullYear());
  const [month] = useState(new Date().getMonth());

  const { data } = useGetMonthlySummary({
    enabled: !!year && !!month,
    month,
    year,
  });

  return (
    <div className="flex justify-between gap-4 px-4 lg:px-0">
      <div className="flex flex-col gap-1 flex-1 bg-white p-4 rounded-lg">
        <div className="flex items-center gap-2 text-muted-foreground">
          <ArrowUpRight className="h-4 w-4" style={{ color: "#10A986" }} />
          <span className="text-sm">Income</span>
        </div>
        <p className="text-lg font-semibold">{data?.data?.income}</p>

        <p className="text-sm text-muted-foreground/80">
          <span className="text-[#10A986] font-medium">12%</span> then last
          month
        </p>
      </div>

      <div className="flex flex-col gap-1 flex-1 bg-white p-4 rounded-lg">
        <div className="flex items-center gap-2 text-muted-foreground">
          <ArrowDownRight className="h-4 w-4" style={{ color: "#ED4F4F" }} />
          <span className="text-sm">Expense</span>
        </div>
        <p className="text-lg font-semibold">{data?.data?.expense}</p>
        <p className="text-sm text-muted-foreground/80">
          <span className="text-red-500 font-medium">-12%</span> then last month
        </p>
      </div>
    </div>
  );
}
