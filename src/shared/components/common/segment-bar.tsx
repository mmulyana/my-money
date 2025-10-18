import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/shared/components/ui/tooltip";
import { cn } from "@/shared/lib/utils";

type Slice = {
  id: string | number;
  name: string;
  color: string;
  total: number;
};

type Props = {
  data: Slice[];
  total?: number;
  className?: string;
};

export function SegmentBar({ data, total, className }: Props) {
  const totalSum = total ?? data.reduce((acc, item) => acc + item.total, 0);

  return (
    <TooltipProvider>
      <div className={cn("flex w-full h-3 rounded relative gap-1", className)}>
        {data?.map((item) => {
          const widthPercent = (item.total / totalSum) * 100;

          return (
            <Tooltip key={item.id}>
              <TooltipTrigger asChild>
                <div
                  className={cn(
                    "h-full rounded absolute top-0 left-0 transition-all ease-in",
                  )}
                  style={{
                    width: `${widthPercent}%`,
                    backgroundColor: item.color,
                    position: "relative",
                  }}
                />
              </TooltipTrigger>
              <TooltipContent>
                <p className="text-sm font-medium">{item.name}</p>
                <p className="text-xs text-muted-foreground">{item.total}</p>
              </TooltipContent>
            </Tooltip>
          );
        })}
      </div>
    </TooltipProvider>
  );
}
