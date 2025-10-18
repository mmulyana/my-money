import TransactionItem from "./transaction-item";
import { Transaction } from "../types";
import { cn } from "@/shared/lib/utils";

type TransactionGroupProps = {
  date: string;
  amount: number;
  transactions: Transaction[];
};

export function TransactionGroup(props: TransactionGroupProps) {
  return (
    <div className="bg-white rounded-lg overflow-hidden border border-muted-foreground/10">
      <div className="flex justify-between items-center p-4 py-2 border-b border-dashed">
        <span className="text-foreground/50">{props.date}</span>
        <span
          className={cn(
            "text-foreground text-right font-medium",
            props.amount < 0 && "text-red-500",
          )}
        >
          {props.amount}
        </span>
      </div>

      <div>
        {props.transactions?.map((t) => (
          <TransactionItem
            key={t.id}
            id={t.id}
            categoryId={t.categoryId}
            date={t.date}
            walletId={t.walletId}
            amount={t.amount}
            remark={t.remark}
            category={t.category}
            type={t.type}
            wallet={t.wallet}
          />
        ))}
      </div>
    </div>
  );
}
