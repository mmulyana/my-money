import ProgressBar from "@/shared/components/common/progress-bar";

export default function BudgetOverviewCard() {
  return (
    <div className="p-4 lg:rounded-lg w-full bg-white">
      <p className="text-[13px] font-medium text-foreground mb-4">Budgets</p>

      <div className="space-y-4">
        <div className="pb-2.5 border-b border-muted-foreground/10">
          <p className="text-[15px] text-foreground/80 mb-1">Maintain</p>
          <p className="text-base font-medium text-foreground mb-1">
            4.500.000 IDR
          </p>

          <ProgressBar progress={20} color="#10A986" />
          <div className="flex justify-between items-center">
            <p className="text-sm text-foreground">
              <span className="opacity-50">Remaining </span>
              2.100.000 IDR
            </p>
            <p></p>
          </div>
        </div>
        <div>
          <p className="text-[15px] text-foreground/80 mb-1">Maintain</p>
          <p className="text-base font-medium text-foreground mb-1">
            4.500.000 IDR
          </p>

          <ProgressBar progress={20} color="#10A986" />
          <div className="flex justify-between items-center">
            <p className="text-sm text-foreground">
              <span className="opacity-50">Remaining </span>
              2.100.000 IDR
            </p>
            <p></p>
          </div>
        </div>
      </div>
    </div>
  );
}
