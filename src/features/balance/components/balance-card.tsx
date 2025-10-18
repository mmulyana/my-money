import * as React from "react";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/shared/components/ui/chart";
import { BarChart, Bar, XAxis, YAxis } from "recharts";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/shared/components/ui/popover";
import { Button } from "@/shared/components/ui/button";
import { ChevronDown, ArrowUpRight, ArrowDownRight } from "lucide-react";
import { cn } from "@/shared/lib/utils";

type WalletOption = "All wallet" | "Main wallet" | "Saving wallet";
type TimeRange = "Last 7 Days" | "Last 14 Days" | "Last 30 Days";

type ChartData = {
  date: string;
  income: number;
  expense: number;
};

export function BalanceOverview() {
  const [wallet, setWallet] = React.useState<WalletOption>("All wallet");
  const [timeRange, setTimeRange] = React.useState<TimeRange>("Last 7 Days");

  const data: ChartData[] = [
    { date: "8 Oct", income: 20000000000, expense: 10000000000 },
    { date: "10 Oct", income: 20000000000, expense: 12000000000 },
    { date: "12 Oct", income: 20000000000, expense: 15000000000 },
    { date: "14 Oct", income: 20000000000, expense: 14000000000 },
    { date: "16 Oct", income: 15000000000, expense: 10000000000 },
    { date: "18 Oct", income: 20000000000, expense: 11000000000 },
    { date: "20 Oct", income: 14000000000, expense: 9000000000 },
  ];

  function handleWalletChange(option: WalletOption): void {
    setWallet(option);
  }

  function handleTimeRangeChange(range: TimeRange): void {
    setTimeRange(range);
  }

  return (
    <div className="flex flex-col gap-4">
      {/* Header */}
      <div className="flex items-center flex-col gap-1 justify-center bg-white p-4 lg:rounded-xl">
        <h2 className="text-sm text-muted-foreground">Total Balance</h2>
        <p className="text-lg font-semibold">Rp 20.000.000.000</p>
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              size={"sm"}
              className="flex items-center gap-2 bg-white shadow-none"
            >
              {wallet} <ChevronDown className="h-4 w-4" />
            </Button>
          </PopoverTrigger>
          <PopoverContent align="center" className="w-[160px] p-1">
            {(
              ["All wallet", "Main wallet", "Saving wallet"] as WalletOption[]
            ).map((option) => (
              <div
                key={option}
                onClick={() => handleWalletChange(option)}
                className={cn(
                  "cursor-pointer rounded px-3 py-2 text-sm hover:bg-muted",
                  wallet === option && "bg-muted font-medium",
                )}
              >
                {option}
              </div>
            ))}
          </PopoverContent>
        </Popover>
      </div>

      {/* Income & Expense Summary */}
      <div className="flex justify-between gap-4 px-4 lg:px-0">
        <div className="flex flex-col gap-1 flex-1 bg-white p-4 rounded-lg">
          <div className="flex items-center gap-2 text-muted-foreground">
            <ArrowUpRight className="h-4 w-4" style={{ color: "#10A986" }} />
            <span className="text-sm">Income</span>
          </div>
          <p className="text-lg font-semibold">Rp 20.000.000.000</p>

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
          <p className="text-lg font-semibold">Rp 20.000.000.000</p>
          <p className="text-sm text-muted-foreground/80">
            <span className="text-red-500 font-medium">-12%</span> then last
            month
          </p>
        </div>
      </div>

      {/* Chart */}
      <div className="px-4 pt-4 bg-white lg:rounded-lg">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-sm font-medium text-muted-foreground">
            Overview
          </h3>

          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                size="sm"
                className="flex items-center gap-2 bg-white shadow-none"
              >
                {timeRange} <ChevronDown className="h-4 w-4" />
              </Button>
            </PopoverTrigger>
            <PopoverContent align="end" className="w-fit p-1">
              {(
                ["Last 7 Days", "Last 14 Days", "Last 30 Days"] as TimeRange[]
              ).map((range) => (
                <div
                  key={range}
                  onClick={() => handleTimeRangeChange(range)}
                  className={cn(
                    "cursor-pointer rounded px-3 py-2 text-sm hover:bg-muted",
                    timeRange === range && "bg-muted font-medium",
                  )}
                >
                  {range}
                </div>
              ))}
            </PopoverContent>
          </Popover>
        </div>

        <ChartContainer className="h-[120px] w-full" config={{}}>
          <BarChart data={data} barSize={12}>
            <XAxis dataKey="date" tickLine={false} axisLine={false} />
            <YAxis hide />
            <ChartTooltip content={<ChartTooltipContent />} />
            <Bar dataKey="income" fill="#10A986" radius={[6, 6, 0, 0]} />
            <Bar dataKey="expense" fill="#EEE8E9" radius={[6, 6, 0, 0]} />
          </BarChart>
        </ChartContainer>
      </div>
    </div>
  );
}

export default BalanceOverview;
