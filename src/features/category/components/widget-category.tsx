'use client'

import { Pie, PieChart } from 'recharts'
import { api } from '@/trpc/react'

import CategoryItem from '@/features/category/components/category-item'
import { useMonthRange } from '@/shared/hooks/use-month-range'
import {
  type ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart'

const chartConfig = {} satisfies ChartConfig

export default function WidgetCategory() {
  const { endDate, startDate } = useMonthRange()
  const { data } = api.category.summaryByCategory.useQuery({
    startDate,
    endDate,
  })

  const chartData =
    data?.categories.map((cat) => ({
      name: cat.name,
      value: cat.amount,
      fill: cat.color,
    })) ?? []

  return (
    <div className="h-fit w-full rounded-lg border bg-white p-6">
      <div className="flex items-center justify-between">
        <p className="text-sm">Category</p>
      </div>
      <div className="h-[180px]">
        <ChartContainer
          config={chartConfig}
          className="mx-auto -mt-10 aspect-square max-h-[250px]"
        >
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Pie
              data={chartData}
              dataKey="value"
              nameKey="name"
              innerRadius={60}
              outerRadius={72}
              cornerRadius={20}
              paddingAngle={4}
            />
          </PieChart>
        </ChartContainer>
      </div>
      <div className="mt-6 space-y-6">
        {data?.categories?.map((category) => (
          <div key={category.id}>
            <div className="flex items-center justify-between space-x-4">
              <div className="flex items-center space-x-2">
                <CategoryItem
                  data={category}
                  styleCategory={{
                    icon: '!h-4',
                  }}
                  hideType
                />
              </div>
              <p>{(Math.round(category.percentage * 100) / 100).toFixed(0)}%</p>
            </div>
            <div className="relative mt-2 h-2 w-full rounded-full bg-gray-100">
              <div
                className="absolute left-0 h-full rounded-full"
                style={{
                  background: category.color,
                  width: category.percentage + 'px',
                }}
              ></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
