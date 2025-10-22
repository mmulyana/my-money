import ProgressBar from "@/shared/components/common/progress-bar";
import { useGetBudget } from "../api/get-budget";
import useCalendarMonth from "@/shared/hooks/use-calendar-month";
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyTitle,
} from "@/shared/components/ui/empty";
import BudgetForm from "./budget-form";
import { Button } from "@/shared/components/ui/button";

export default function BudgetOverviewCard() {
  const { monthIndex, year } = useCalendarMonth();

  const { data } = useGetBudget({
    month: monthIndex,
    year,
  });

  if (data?.data?.length === 0) {
    return (
      <Wrapper>
        <Empty>
          <EmptyHeader>
            <EmptyTitle>No budget yet</EmptyTitle>
            <EmptyDescription>
              Get started by creating your first budget
            </EmptyDescription>
          </EmptyHeader>

          <EmptyContent>
            <BudgetForm>
              <Button size={"sm"} variant={"secondary"}>
                New Budget
              </Button>
            </BudgetForm>
          </EmptyContent>
        </Empty>
      </Wrapper>
    );
  }

  return (
    <Wrapper>
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
    </Wrapper>
  );
}

function Wrapper({ children }: React.PropsWithChildren) {
  return (
    <div className="p-4 lg:rounded-lg w-full bg-white">
      <p className="text-[13px] font-medium text-foreground mb-4">Budgets</p>
      {children}
    </div>
  );
}
