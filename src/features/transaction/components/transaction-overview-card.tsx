"use client";

import { useState } from "react";
import CategoryImage from "@/features/category/components/category-img";
import { SegmentBar } from "@/shared/components/common/segment-bar";
import { useGetOverview } from "../api/get-overview";

export default function TransactionOverviewCard({
  variant,
}: {
  variant: "expense" | "income";
}) {
  const [currDate] = useState<Date>(() => new Date());

  const { data } = useGetOverview({
    date: currDate.toString(),
    enabled: true,
    type: variant,
  });

  const total = data?.total ?? 0;

  return (
    <div className="bg-white rounded-lg p-4 pb-5">
      <p className="text-[13px] font-medium text-foreground mb-4">
        {variant === "expense" ? "Spending" : "Income"} Overview
      </p>
      <div className="space-y-5">
        {data?.data?.map((i) => {
          const percent = (i.total / total) * 100;
          return (
            <div className="flex gap-2 items-start" key={i.id}>
              <div className="w-9 shrink-0">
                <CategoryImage
                  color={i.color}
                  url={i.imageUrl}
                  variant={i.imageVariant as any}
                />
              </div>
              <div className="space-y-1 flex-1">
                <div className="flex justify-between items-center">
                  <p className="text-sm text-foreground/80">{i.name}</p>
                  <p className="text-sm text-foreground/80">
                    {percent.toFixed(0)}%
                  </p>
                </div>
                <SegmentBar
                  className="bg-transparent"
                  total={total}
                  data={[
                    {
                      id: i.id,
                      name: i.name,
                      color: i.color,
                      total: i.total,
                    },
                  ]}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
