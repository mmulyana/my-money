import { ChevronDown } from "lucide-react";
import { useMemo, useState } from "react";

import { Button } from "@/shared/components/ui/button";
import { cn } from "@/shared/lib/utils";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/shared/components/ui/popover";

import { useGetWallet } from "@/features/wallet/api/get-wallet";
import { Wallet } from "@/features/wallet/types";

export function BalanceOverview() {
  const [open, setOpen] = useState(false);
  const { data } = useGetWallet({});

  const [wallet, setWallet] = useState<Partial<Wallet>>({
    id: "All wallet",
    name: "All wallet",
  });

  function showBalance(type: string) {
    if (type === "All wallet") {
      const total = data?.data.reduce(
        (prev, acc) => (prev += Number(acc.balance)),
        0,
      );
      return total;
    }

    const wallet = data?.data?.find((i) => i.id === type);
    if (wallet) {
      return wallet.balance;
    }
    return 0;
  }

  const options = useMemo(() => {
    const arr = [
      {
        id: "All wallet",
        name: "All wallet",
      },
    ];
    if (data?.data.length) {
      const wallets = data.data.map((i) => ({
        id: i.id,
        name: i.name,
      }));
      return [...arr, ...wallets];
    } else {
      return arr;
    }
  }, [data?.data.length]);

  return (
    <div className="flex items-center flex-col gap-1 justify-center bg-white p-4 lg:rounded-xl">
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            size={"sm"}
            className="flex mb-2 py-1 !pr-1.5 w-fit h-fit items-center gap-2 bg-white shadow-none rounded-full"
          >
            {wallet?.name} <ChevronDown className="h-4 w-4" />
          </Button>
        </PopoverTrigger>
        <PopoverContent align="center" className="w-[160px] p-1">
          {options.map((option) => (
            <div
              key={option.id}
              onClick={() => {
                setWallet({
                  id: option.id,
                  name: option.name,
                });
                setOpen(false);
              }}
              className={cn(
                "cursor-pointer rounded px-3 py-2 text-sm hover:bg-muted",
              )}
            >
              {option.name}
            </div>
          ))}
        </PopoverContent>
      </Popover>
      <h2 className="text-sm text-muted-foreground">Total Balance</h2>
      <p className="text-xl font-semibold">{showBalance(wallet.id || "")}</p>
    </div>
  );
}

export default BalanceOverview;
