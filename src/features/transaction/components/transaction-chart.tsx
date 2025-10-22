import { BarChart, Bar, XAxis, YAxis } from "recharts";
import { useState } from "react";

import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/shared/components/ui/chart";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/shared/components/ui/popover";
import { Button } from "@/shared/components/ui/button";
import { IconCaretDownFilled } from "@tabler/icons-react";
import { cn } from "@/shared/lib/utils";
type TimeRange = "Last 7 Days" | "Last 14 Days" | "Last 30 Days";

type ChartData = {
  date: string;
  income: number;
  expense: number;
};

export default function TransactionChart() {
  const [timeRange, setTimeRange] = useState<TimeRange>("Last 7 Days");

  const data: ChartData[] = [
    { date: "8 Oct", income: 20000000000, expense: 10000000000 },
    { date: "10 Oct", income: 20000000000, expense: 12000000000 },
    { date: "12 Oct", income: 20000000000, expense: 15000000000 },
    { date: "14 Oct", income: 20000000000, expense: 14000000000 },
    { date: "16 Oct", income: 15000000000, expense: 10000000000 },
    { date: "18 Oct", income: 20000000000, expense: 11000000000 },
    { date: "20 Oct", income: 14000000000, expense: 9000000000 },
  ];

  function handleTimeRangeChange(range: TimeRange): void {
    setTimeRange(range);
  }

  return (
    <div className="px-4 pt-4 bg-white lg:rounded-lg">
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-sm font-medium text-muted-foreground">Overview</h3>

        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              size="sm"
              className="flex items-center gap-2 bg-white shadow-none"
            >
              {timeRange} <IconCaretDownFilled className="h-4 w-4" />
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
  );
}
