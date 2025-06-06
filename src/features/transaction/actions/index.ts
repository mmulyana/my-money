'use server'

import { getSessionOrThrow } from '@/lib/auth-handler'
import { formatError } from '@/lib/utils'
import prisma from '@/lib/prisma'

import { transactionSchema } from '../schema/create.schema'

export async function createTransaction(formData: unknown) {
	const session = await getSessionOrThrow()

	const parsed = transactionSchema.safeParse(formData)

	if (!parsed.success) {
		return { error: parsed.error.flatten().fieldErrors }
	}

	try {
		await prisma.transaction.create({
			data: {
				...parsed.data,
				userId: session.user.id,
			},
		})

		return { success: true, message: 'Berhasil disimpan' }
	} catch (error) {
		console.log(error)
		return { success: false, message: formatError(error) }
	}
}
