import ProgressBar from "@/shared/components/common/progress-bar";
import { useGetBudget } from "../api/get-budget";
import useCalendarMonth from "@/shared/hooks/use-calendar-month";

export default function BudgetOverviewCard() {
  const { month, year } = useCalendarMonth();

  const { data } = useGetBudget({
    month: +month,
    year,
  });

  return (
    <div className="p-4 lg:rounded-lg w-full bg-white">
      <p className="text-[13px] font-medium text-foreground mb-4">Budgets</p>

      <div className="space-y-4">
        {data?.data?.map((i) => (
          <div
            key={i.id}
            className="pb-2.5 border-b border-muted-foreground/10"
          >
            <p className="text-[15px] text-foreground/80 mb-1">{i.name}</p>
            <p className="text-base font-medium text-foreground mb-1">
              {i.spent}
            </p>

            <ProgressBar progress={i.usage} color="#10A986" />
            <div className="flex justify-between items-center">
              <p className="text-sm text-foreground">
                <span className="opacity-50">Remaining </span>
                {i.remaining} IDR
              </p>
              <p></p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
