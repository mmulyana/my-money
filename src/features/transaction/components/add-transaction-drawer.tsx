'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { useState } from 'react'
import { toast } from 'sonner'

import { Button } from '@/components/ui/button'
import { Form } from '@/components/ui/form'
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '@/components/ui/dialog'

import { TransactionInput, transactionSchema } from '../schema/create.schema'
import { TransactionForm } from './transaction-form'
import { createTransaction } from '../actions'

export default function AddTransactionDrawer() {
	const [open, setOpen] = useState(false)

	const form = useForm<TransactionInput>({
		resolver: zodResolver(transactionSchema),
		defaultValues: {
			type: 'EXPENSE',
			amount: 0,
			note: '',
			date: new Date(),
		},
	})

	const onSubmit = async (data: TransactionInput) => {
		const res = await createTransaction(data)
		if (!res.success) {
			toast.error(res.message)
			return
		}

		toast.success(res.message)
	}

	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<DialogTrigger asChild>
				<Button className='rounded-full fixed bottom-4 left-1/2 -translate-x-1/2'>
					Buat
				</Button>
			</DialogTrigger>
			<DialogContent className='max-w-xl mx-auto px-6 pb-10'>
				<DialogHeader className='mb-4'>
					<DialogTitle>Transaksi baru</DialogTitle>
				</DialogHeader>
				<Form {...form}>
					<TransactionForm onSubmit={onSubmit} />
				</Form>
			</DialogContent>
		</Dialog>
	)
}
