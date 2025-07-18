import { differenceInCalendarDays } from 'date-fns'

export default function SpendingTip({
  amount,
  remaining,
  endDate,
}: {
  amount: number
  remaining: number
  endDate: Date
}) {
  const currentDate = new Date()

  const diffDays = differenceInCalendarDays(endDate, currentDate)
  const remainingDays = diffDays + 1
  const dailyBudget = Math.floor(remaining / remainingDays)

  return (
    <div className="rounded-md border border-yellow-300 bg-yellow-50 p-4 text-yellow-800">
      <div className="flex items-center gap-2 font-medium">
        <span>⏳</span>
        <span>Spending Tip</span>
      </div>
      <p className="mt-1 text-sm">
        You can spend up to{' '}
        <span className="font-semibold">{dailyBudget.toLocaleString()}</span>{' '}
        per day to stay within your budget for the next{' '}
        <span className="font-semibold">{remainingDays}</span> days.
      </p>
    </div>
  )
}
