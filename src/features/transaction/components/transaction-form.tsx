'use client'

import { useFormContext } from 'react-hook-form'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import {
	Select,
	SelectTrigger,
	SelectValue,
	SelectContent,
	SelectItem,
} from '@/components/ui/select'
import {
	FormField,
	FormItem,
	FormLabel,
	FormControl,
	FormMessage,
} from '@/components/ui/form'
import { format } from 'date-fns'
import { TransactionInput } from '../schema/create.schema'

type Props = {
	onSubmit: (data: TransactionInput) => void
}

export function TransactionForm({ onSubmit }: Props) {
	const form = useFormContext<TransactionInput>()

	return (
		<form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
			<FormField
				control={form.control}
				name='amount'
				render={({ field }) => (
					<FormItem>
						<FormLabel>Amount</FormLabel>
						<FormControl>
							<Input type='number' {...field} />
						</FormControl>
						<FormMessage />
					</FormItem>
				)}
			/>

			<FormField
				control={form.control}
				name='type'
				render={({ field }) => (
					<FormItem>
						<FormLabel>Type</FormLabel>
						<Select onValueChange={field.onChange} value={field.value}>
							<FormControl>
								<SelectTrigger>
									<SelectValue placeholder='Select type' />
								</SelectTrigger>
							</FormControl>
							<SelectContent>
								<SelectItem value='INCOME'>Income</SelectItem>
								<SelectItem value='EXPENSE'>Expense</SelectItem>
							</SelectContent>
						</Select>
						<FormMessage />
					</FormItem>
				)}
			/>

			<FormField
				control={form.control}
				name='note'
				render={({ field }) => (
					<FormItem>
						<FormLabel>Note</FormLabel>
						<FormControl>
							<Textarea placeholder='Optional' {...field} />
						</FormControl>
						<FormMessage />
					</FormItem>
				)}
			/>

			<FormField
				control={form.control}
				name='date'
				render={({ field }) => (
					<FormItem>
						<FormLabel>Date</FormLabel>
						<FormControl>
							<Input
								type='date'
								value={field.value ? format(field.value, 'yyyy-MM-dd') : ''}
								onChange={(e) => field.onChange(new Date(e.target.value))}
							/>
						</FormControl>
						<FormMessage />
					</FormItem>
				)}
			/>

			<FormField
				control={form.control}
				name='categoryId'
				render={({ field }) => (
					<FormItem>
						<FormLabel>Category</FormLabel>
						<FormControl>
							<Input {...field} placeholder='Category ID' />
						</FormControl>
						<FormMessage />
					</FormItem>
				)}
			/>

			<FormField
				control={form.control}
				name='walletId'
				render={({ field }) => (
					<FormItem>
						<FormLabel>Wallet</FormLabel>
						<FormControl>
							<Input {...field} placeholder='Wallet ID' />
						</FormControl>
						<FormMessage />
					</FormItem>
				)}
			/>

			<Button type='submit'>Save</Button>
		</form>
	)
}
