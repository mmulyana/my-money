import { PrismaClient } from '@prisma/client'

const prismaClientSingleton = () => new PrismaClient()

const globalForPrisma = globalThis as typeof globalThis & {
  prismaGlobal?: ReturnType<typeof prismaClientSingleton>
}

const prisma = globalForPrisma.prismaGlobal ?? prismaClientSingleton()

if (process.env.NODE_ENV !== 'production') {
  globalForPrisma.prismaGlobal = prisma
}

export default prisma
