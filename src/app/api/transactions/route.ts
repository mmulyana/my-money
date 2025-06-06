import { getSessionOrThrow } from '@/lib/auth-handler'
import prisma from '@/lib/prisma'
import { NextResponse } from 'next/server'

export async function GET() {
	try {
		const session = await getSessionOrThrow()

		const transactions = await prisma.transaction.findMany({
			orderBy: { createdAt: 'desc' },
			where: { userId: session.user.id },
		})
		return NextResponse.json(transactions)
	} catch (error) {
		return new NextResponse('Internal server error', { status: 500 })
	}
}
