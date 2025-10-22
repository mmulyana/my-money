import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";
import { useState } from "react";

import {
  ChartConfig,
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
import { useTransactionChart } from "../api/get-transaction-chart";

type ChartData = {
  date: string;
  income: number;
  expense: number;
};

const defaultOption = [
  {
    value: "1w",
    name: "Last 7 Days",
  },
  {
    value: "2w",
    name: "Last 14 Days",
  },
  {
    value: "1m",
    name: "Last 30 Days",
  },
];

const chartConfig = {
  income: {
    label: "Income",
    color: "#10A986",
  },
  expense: {
    label: "Expense",
    color: "#EEE8E9",
  },
} satisfies ChartConfig;

export default function TransactionChart() {
  const [timeRange, setTimeRange] = useState<{ value: string; name: string }>(
    defaultOption[0],
  );

  const [date] = useState(new Date());
  const { data } = useTransactionChart({
    date: date.toString(),
    range: timeRange.value,
    enabled: !!date,
  });

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
              {timeRange.name} <IconCaretDownFilled className="h-4 w-4" />
            </Button>
          </PopoverTrigger>
          <PopoverContent align="end" className="w-fit p-1">
            {defaultOption.map((range) => (
              <div
                key={range.value}
                onClick={() =>
                  setTimeRange({
                    name: range.name,
                    value: range.value,
                  })
                }
                className={cn(
                  "cursor-pointer rounded px-3 py-2 text-sm hover:bg-muted",
                  timeRange === range && "bg-muted font-medium",
                )}
              >
                {range.name}
              </div>
            ))}
          </PopoverContent>
        </Popover>
      </div>

      <ResponsiveContainer width="100%" height={120}>
        <ChartContainer config={chartConfig} className="h-full w-full">
          <BarChart accessibilityLayer data={data?.data} barSize={12}>
            <CartesianGrid vertical={false} />
            <XAxis dataKey="date" tickLine={false} axisLine={false} />
            <YAxis hide />
            <ChartTooltip content={<ChartTooltipContent />} />
            <Bar dataKey="income" fill="#10A986" radius={[6, 6, 0, 0]} />
            <Bar dataKey="expense" fill="#EEE8E9" radius={[6, 6, 0, 0]} />
          </BarChart>
        </ChartContainer>
      </ResponsiveContainer>
    </div>
  );
}
