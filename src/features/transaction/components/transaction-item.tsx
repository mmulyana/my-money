import { IconChevronRight } from "@tabler/icons-react";
import React from "react";

import { cn } from "@/shared/lib/utils";
import { Transaction } from "../types";
import TransactionForm from "./transaction-form";
import CategoryImage from "@/features/category/components/category-img";
import WalletBadge from "@/features/wallet/components/wallet-badge";

export default function TransactionItem(props: Partial<Transaction>) {
  return (
    <TransactionForm data={props}>
      <div
        className={cn(
          "flex items-center justify-between py-3 px-4 cursor-pointer hover:bg-gray-400/10",
        )}
      >
        <div className="flex items-center gap-2 basis-[120px] shrink-0 flex-2">
          <CategoryImage
            color={props?.category?.color || ""}
            url={props?.category?.imageUrl || ""}
            variant={(props?.category?.imageVariant as any) || "style-1"}
          />
          <div className="space-y-1">
            <p className="text-sm text-foreground font-medium">
              {props?.category?.name}
            </p>
            <div className="space-x-2">
              <p className="text-sm text-foreground/50">{props?.remark}</p>
              <WalletBadge data={props?.wallet} />
            </div>
          </div>
        </div>

        <div className="flex gap-1 items-center">
          <span
            className={cn(
              props?.type && props?.type === "income"
                ? "text-foreground"
                : "text-red-500",
            )}
          >
            {props.type == "expense" && "-"}
            {props?.amount}
          </span>
          <button className="h-5 w-5 flex justify-center text-foreground/50 items-center cursor-pointer rounded">
            <IconChevronRight size={18} />
          </button>
        </div>
      </div>
    </TransactionForm>
  );
}
