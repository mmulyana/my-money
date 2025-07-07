import { useMemo } from 'react'
import { startOfMonth, endOfMonth } from 'date-fns'

export function useMonthRange(
  monthIndex: number = new Date().getMonth(),
  year: number = new Date().getFullYear(),
) {
  const range = useMemo(() => {
    if (monthIndex < 0 || monthIndex > 11) {
      throw new Error('monthIndex must be between 1 and 12')
    }

    const date = new Date(year, monthIndex)
    const startDate = startOfMonth(date)
    const endDate = endOfMonth(date)

    return { startDate, endDate }
  }, [monthIndex, year])

  return range
}
