"use client";

import BalanceMonthCard from "@/features/balance/components/balance-month-card";
import BalanceTotalCard from "@/features/balance/components/balance-total-card";
import BudgetInfo from "@/features/budget/components/budget-info";
import RecentTransaction from "@/features/transaction/components/recent-transaction";
import { useCallbackOauth } from "@/features/auth/hooks/use-callback-oauth";
import BalanceChart from "@/features/balance/components/balance-card";
import TransactionOverviewCard from "@/features/transaction/components/transaction-overview-card";
import BudgetOverviewCard from "@/features/budget/components/budget-overview-card";
import GoalsOverviewCard from "@/features/wishlist/components/goals-overview-card";
import ProfileButton from "@/features/auth/components/profile-button";
import TransactionSummary from "@/features/transaction/components/transaction-summary";
import TransactionChart from "@/features/transaction/components/transaction-chart";

export default function Home() {
  useCallbackOauth();

  return (
    <div className="space-y-4 2xl:max-w-5xl mx-auto">
      <div className="flex justify-between items-center px-4 lg:px-0 pt-2">
        <p className="text-[15px] text-foreground font-medium">Home</p>
        <ProfileButton />
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="space-y-4">
          <BalanceChart />
          <TransactionSummary />
          <TransactionChart />
          <RecentTransaction />
        </div>
        <div className="space-y-4">
          <TransactionOverviewCard variant="expense" />
          <TransactionOverviewCard variant="income" />
          <BudgetOverviewCard />
          <GoalsOverviewCard />
        </div>
      </div>
    </div>
  );
}
