import ProgressBar from "@/shared/components/common/progress-bar";
import { useGetWishlist } from "../api/get-wishlist";

export default function GoalsOverviewCard() {
  const { data } = useGetWishlist({});
  return (
    <div className="p-4 lg:rounded-lg w-full bg-white">
      <p className="text-[13px] font-medium text-foreground mb-4">Goals</p>

      <div className="flex flex-col gap-4">
        {data?.data?.map((i) => (
          <div
            key={i.id}
            className="pb-2.5 border-b border-muted-foreground/10"
          >
            <div className="flex gap-2 items-center mb-1">
              <div className="h-14 w-14 rounded-md bg-gray-300"></div>
              <div className="flex flex-col justify-center items-start">
                <p className="text-[15px] text-foreground/80">{i.name}</p>
                <p className="text-base font-medium text-foreground">
                  {i.total}
                </p>
              </div>
            </div>

            <ProgressBar progress={i.progress} color="#10A986" />
            <div className="flex justify-between items-center">
              <p className="text-sm text-foreground">
                <span className="opacity-50">Allocate </span>
                200 IDR/Day <span className="opacity-50">to stay on track</span>
              </p>
              <p></p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
