import { Close } from '@radix-ui/react-dialog'
import { ChevronsUpDown } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { useEffect, useMemo, useState } from 'react'
import { format } from 'date-fns'
import {
	IconAlignJustified,
	IconArrowDownRight,
	IconArrowsExchange,
	IconArrowUpRight,
	IconCalendarWeek,
	IconCategory,
	IconChevronLeft,
	IconWallet,
} from '@tabler/icons-react'

import { Tabs, TabsList, TabsTrigger } from '@/shared/components/ui/tabs'
import { Form, FormField, FormItem } from '@/shared/components/ui/form'
import { Button, buttonVariants } from '@/shared/components/ui/button'
import ButtonClose from '@/shared/components/common/button-close'
import { Combobox } from '@/shared/components/common/combobox'
import { Textarea } from '@/shared/components/ui/textarea'
import { Input } from '@/shared/components/ui/input'
import { Label } from '@/shared/components/ui/label'
import {
	Sheet,
	SheetContent,
	SheetTitle,
	SheetTrigger,
} from '@/shared/components/ui/sheet'

import { useGetCategories } from '@/features/category/api/get-category'
import { useGetWallet } from '@/features/wallet/api/get-wallet'
import { TransactionType } from '@/shared/types'

import { useCreateTransaction } from '../api/create-transaction'
import { TransactionForm as FormValues } from '../types/form'
import { Transaction } from '../types'
import { useUpdateTransaction } from '../api/update-transaction'
import { useDestroyTransaction } from '../api/destroy-transaction'

export default function TransactionForm({
	children,
	data,
}: React.PropsWithChildren & { data?: Partial<Transaction> }) {
	const [open, setOpen] = useState(false)
	const [type, setType] = useState<TransactionType>('expense')

	const { data: categories } = useGetCategories({ type })
	const { data: wallets } = useGetWallet({})

	const categoryOptions = useMemo(() => {
		return categories?.data?.map((i) => ({
			value: i.id,
			label: i.name,
		}))
	}, [categories?.data])

	const walletOptions = useMemo(() => {
		return wallets?.data?.map((i) => ({
			value: i.id,
			label: i.name,
		}))
	}, [wallets?.data])

	const { mutate: create } = useCreateTransaction()
	const { mutate: update } = useUpdateTransaction()
	const { mutate: destroy } = useDestroyTransaction()

	const form = useForm<FormValues>({
		defaultValues: {
			amount: 0,
			remark: '',
			date: format(new Date(), 'yyyy-MM-dd'),
			categoryId: '',
			walletId: '',
		},
	})

	const onSubmit = (payload: FormValues) => {
		if (data?.id) {
			update(
				{
					...payload,
					id: data.id,
					type,
					amount: payload.amount.toString() as any,
				},
				{
					onSuccess: () => {
						setOpen(false)
					},
				}
			)
			return
		}
		create(
			{ ...payload, type, amount: payload.amount.toString() as any },
			{
				onSuccess: () => {
					setOpen(false)
				},
				onError: (err) => {
					console.log(err)
				},
			}
		)
	}

	useEffect(() => {
		if (!open && !data?.id) {
			form.reset({
				amount: 0,
				remark: '',
				date: format(new Date(), 'yyyy-MM-dd'),
				categoryId: '',
				walletId: '',
			})
		}
	}, [open])

	useEffect(() => {
		if (data) {
			form.reset({
				amount: data.amount,
				categoryId: data.categoryId,
				remark: data.remark || '',
				walletId: data.walletId,
				type: data.type,
			})
			if (data?.date) {
				form.setValue('date', format(new Date(data?.date as any), 'yyyy-MM-dd'))
			}
			if (data.type) setType(data.type)
		}
	}, [data])

	return (
		<Sheet open={open} onOpenChange={setOpen}>
			<SheetTrigger asChild>{children}</SheetTrigger>
			<SheetContent className='h-full w-full md:w-[400px]' hideClose>
				<Form {...form}>
					<form
						onSubmit={form.handleSubmit(onSubmit)}
						className='flex flex-col h-full'
					>
						<div className='px-4 py-2 border-b border-border flex justify-between items-center shrink-0'>
							<div className='flex gap-4 items-center'>
								<Close
									className={buttonVariants({
										className: 'p-0 h-7 w-7 !px-1 flex md:hidden',
										variant: 'secondary',
									})}
								>
									<IconChevronLeft className='!h-6 !w-6' />
								</Close>
								<SheetTitle className='text-base md:text-sm text-foreground font-medium'>
									New Record
								</SheetTitle>
							</div>
							<div className='gap-2 items-center hidden md:flex'>
								{!!data?.id && (
									<Button
										type='button'
										className='h-7 rounded font-normal text-red-500 shadow-none border-none hover:bg-muted-foreground/10 hover:text-red-800'
										variant={'outline'}
										onClick={() => {
											data.id &&
												destroy(
													{ id: data.id },
													{
														onSuccess: () => {
															setOpen(false)
														},
													}
												)
										}}
									>
										Delete
									</Button>
								)}
								<Button type='submit' className='h-7 rounded font-normal'>
									Save
								</Button>
								<Close type='button'>
									<ButtonClose />
								</Close>
							</div>
						</div>

						<div className='flex justify-between flex-col border h-full flex-1'>
							<div className='space-y-4'>
								<FormField
									control={form.control}
									name='amount'
									render={({ field }) => (
										<FormItem>
											<Input
												value={field.value as number}
												className='text-right px-4 py-2 shadow-none !text-4xl font-medium text-foreground h-fit border-0 !outline-0 !ring-0 rounded-none bg-gray-200'
												onChange={(e) =>
													!isNaN(Number(e.target.value)) &&
													field.onChange(Number(e.target.value))
												}
												inputMode='numeric'
												autoFocus
											/>
										</FormItem>
									)}
								/>

								<Tabs defaultValue='expense' value={type}>
									<TabsList className='rounded-md h-fit border mx-auto'>
										<TabsTrigger
											value='expense'
											onClick={() => setType('expense')}
											className='text-base md:text-sm px-2.5 py-0.5 h-fit rounded data-[state=active]:bg-white group'
										>
											<IconArrowDownRight className='group-data-[state=active]:text-red-500' />
											Expense
										</TabsTrigger>
										<TabsTrigger
											value='income'
											onClick={() => setType('income')}
											className='text-base md:text-sm px-2.5 py-0.5 h-fit rounded data-[state=active]:bg-white group'
										>
											<IconArrowUpRight className='group-data-[state=active]:text-teal-600' />
											Income
										</TabsTrigger>
										<TabsTrigger
											value='transfer'
											onClick={() => setType('transfer')}
											className='text-base md:text-sm px-2.5 py-0.5 h-fit rounded data-[state=active]:bg-white group'
										>
											<IconArrowsExchange className='group-data-[state=active]:text-blue-600' />
											Transfer
										</TabsTrigger>
									</TabsList>
								</Tabs>

								<div className='px-4 pb-4'>
									<div className='rounded-lg bg-white'>
										<FormField
											control={form.control}
											name='categoryId'
											render={({ field }) => (
												<FormItem className='flex justify-between items-center p-2 border-b '>
													<div className='flex gap-1.5 items-center'>
														<IconCategory size={18} />
														<Label className='text-base md:text-sm font-normal'>
															Category
														</Label>
													</div>
													<Combobox
														options={categoryOptions || []}
														value={field.value}
														onValueChange={field.onChange}
														notFoundContent={
															<div className='flex flex-col gap-2'>
																<p>Yang anda cari tidak ditemukan</p>
															</div>
														}
														trigger={
															<Button
																variant='outline'
																role='combobox'
																className='w-44 justify-between bg-white'
															>
																{field.value
																	? categoryOptions?.find(
																			(opt) => opt.value === field.value
																	  )?.label
																	: 'Pilih Kategori'}
																<ChevronsUpDown className='opacity-50' />
															</Button>
														}
													/>
												</FormItem>
											)}
										/>
										<FormField
											control={form.control}
											name='walletId'
											render={({ field }) => (
												<FormItem className='flex justify-between items-center p-2 border-b '>
													<div className='flex gap-1.5 items-center'>
														<IconWallet size={18} />
														<Label className='text-base md:text-sm font-normal'>
															Wallet
														</Label>
													</div>
													<Combobox
														options={walletOptions || []}
														value={field.value}
														onValueChange={field.onChange}
														notFoundContent={
															<div className='flex flex-col gap-2'>
																<p>Yang anda cari tidak ditemukan</p>
															</div>
														}
														trigger={
															<Button
																variant='outline'
																role='combobox'
																className='w-44 justify-between bg-white'
															>
																{field.value
																	? walletOptions?.find(
																			(opt) => opt.value === field.value
																	  )?.label
																	: 'Pilih akun'}
																<ChevronsUpDown className='opacity-50' />
															</Button>
														}
													/>
												</FormItem>
											)}
										/>

										<FormField
											control={form.control}
											name='date'
											render={({ field }) => (
												<FormItem className='flex justify-between items-center p-2 border-b '>
													<div className='flex gap-1.5 items-center'>
														<IconCalendarWeek size={18} />
														<Label className='text-base md:text-sm font-normal'>
															Date
														</Label>
													</div>
													<Input
														value={field.value}
														onChange={field.onChange}
														type='date'
														className='block w-44'
													/>
												</FormItem>
											)}
										/>

										<FormField
											control={form.control}
											name='remark'
											render={({ field }) => (
												<FormItem className='p-2'>
													<div className='flex gap-1.5 items-center'>
														<IconAlignJustified size={18} />
														<Label className='text-base md:text-sm font-normal'>
															Remark
														</Label>
													</div>
													<Textarea
														value={field.value}
														onChange={field.onChange}
													/>
												</FormItem>
											)}
										/>
									</div>
								</div>
							</div>

							<div className='gap-2 items-center block md:hidden mt-auto px-4 pb-4'>
								<Button
									type='submit'
									className='h-8 w-full rounded font-normal'
								>
									Save
								</Button>
							</div>
						</div>
					</form>
				</Form>
			</SheetContent>
		</Sheet>
	)
}
