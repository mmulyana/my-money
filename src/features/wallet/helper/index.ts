import { startOfMonth, endOfMonth } from 'date-fns'
import { PrismaClient } from '@prisma/client'

export async function updateTotalWallet(
  prisma: PrismaClient,
  walletId: string,
  date: Date,
) {
  const month = date.getMonth() + 1
  const year = date.getFullYear()

  const start = startOfMonth(date)
  const end = endOfMonth(date)

  const transactions = await prisma.transaction.findMany({
    where: {
      walletId,
      date: {
        gte: start,
        lte: end,
      },
    },
  })

  const total = transactions.reduce((sum, tx) => {
    return sum + (tx.type === 'INCOME' ? tx.amount : -tx.amount)
  }, 0)

  const existing = await prisma.totalWallet.findFirst({
    where: {
      walletId,
      month,
      year,
    },
  })

  if (existing) {
    await prisma.totalWallet.update({
      where: { id: existing.id },
      data: { total },
    })
  } else {
    await prisma.totalWallet.create({
      data: {
        walletId,
        month,
        year,
        total,
      },
    })
  }
}
