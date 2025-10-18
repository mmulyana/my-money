import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/shared/components/ui/popover";
import { useGetMe } from "../api/get-me";
import { IconCaretDownFilled } from "@tabler/icons-react";

export default function ProfileButton() {
  const { data } = useGetMe();
  return (
    <Popover>
      <PopoverTrigger asChild>
        <div className="flex justify-between items-center p-1.5 rounded-lg hover:bg-muted-foreground/5 gap-2 cursor-pointer">
          <div className="flex items-center space-x-2">
            <div className="h-6 w-6 rounded-full bg-gray-300"></div>
            <p className="text-base font-medium">{data?.data?.username}</p>
          </div>
          <button>
            <IconCaretDownFilled size={18} />
          </button>
        </div>
      </PopoverTrigger>
      <PopoverContent align="end" className="w-[210px] p-2 space-y-2">
        <div className="flex items-center gap-2 border-b pb-2">
          <div className="h-8 w-8 rounded bg-gray-300"></div>
          <p className="text-base leading-none">{data?.data?.username}</p>
        </div>
      </PopoverContent>
    </Popover>
  );
}
