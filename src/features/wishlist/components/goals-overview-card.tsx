import ProgressBar from "@/shared/components/common/progress-bar";
import { Button } from "@/shared/components/ui/button";

export default function GoalsOverviewCard() {
  return (
    <div className="p-4 lg:rounded-lg w-full bg-white">
      <p className="text-[13px] font-medium text-foreground mb-4">Goals</p>

      <div className="flex flex-col gap-4">
        <div className="pb-2.5 border-b border-muted-foreground/10">
          <div className="flex gap-2 items-center mb-1">
            <div className="h-14 w-14 rounded-md bg-gray-300"></div>
            <div className="flex flex-col justify-center items-start">
              <p className="text-[15px] text-foreground/80">iPhone 13</p>
              <p className="text-base font-medium text-foreground">
                4.500.000 IDR
              </p>
            </div>
          </div>

          <ProgressBar progress={20} color="#10A986" />
          <div className="flex justify-between items-center">
            <p className="text-sm text-foreground">
              <span className="opacity-50">Allocate </span>
              200 IDR/Day <span className="opacity-50">to stay on track</span>
            </p>
            <p></p>
          </div>
        </div>
        <div>
          <div className="flex gap-2 items-center mb-1">
            <div className="h-14 w-14 rounded-md bg-gray-300"></div>
            <div className="flex flex-col justify-center items-start">
              <p className="text-[15px] text-foreground/80">Macbook Pro</p>
              <p className="text-base font-medium text-foreground">
                4.500.000 IDR
              </p>
            </div>
          </div>

          <ProgressBar progress={20} color="#10A986" />
          <div className="flex justify-between items-center">
            <p className="text-sm text-foreground">
              <span className="opacity-50">your off track </span>
              <Button
                variant={"link"}
                className="h-fit p-0 text-foreground font-normal"
              >
                adjust goals
              </Button>
            </p>
            <p></p>
          </div>
        </div>
      </div>
    </div>
  );
}
