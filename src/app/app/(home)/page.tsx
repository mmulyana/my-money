"use client";

import DailyExpenseCard from "@/features/transaction/components/daily-expense-card";
import BalanceMonthCard from "@/features/balance/components/balance-month-card";
import BalanceTotalCard from "@/features/balance/components/balance-total-card";
import BudgetInfo from "@/features/budget/components/budget-info";
import RecentTransaction from "@/features/transaction/components/recent-transaction";
import { useCallbackOauth } from "@/features/auth/hooks/use-callback-oauth";
import BalanceChart from "@/features/balance/components/balance-card";
import TransactionOverviewCard from "@/features/transaction/components/transaction-overview-card";

export default function Home() {
  useCallbackOauth();

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 max-w-5xl mx-auto">
      <div className="space-y-4">
        <BalanceChart />
        <RecentTransaction />
      </div>
      <div className="space-y-4">
        <TransactionOverviewCard variant="expense" />
        <TransactionOverviewCard variant="income" />
      </div>
    </div>
  );
}
