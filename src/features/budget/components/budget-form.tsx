import {
	IconPlus,
	IconCheck,
	IconMinus,
	IconWallet,
	IconSelector,
	IconTrashFilled,
	IconChevronLeft,
	IconChevronRight,
	IconCategoryPlus,
} from '@tabler/icons-react'
import { useFieldArray, useForm } from 'react-hook-form'
import { AnimatedCounter } from 'react-animated-counter'
import { Close } from '@radix-ui/react-dialog'
import { CalendarIcon } from 'lucide-react'
import { useMemo, useState } from 'react'
import { format } from 'date-fns'

import SlicedProgressBar from '@/shared/components/common/sliced-progress-bar'
import ButtonClose from '@/shared/components/common/button-close'
import { Sheet, SheetContent, SheetTrigger } from '@/shared/components/ui/sheet'
import { Button, buttonVariants } from '@/shared/components/ui/button'
import { Combobox } from '@/shared/components/common/combobox'
import { Calendar } from '@/shared/components/ui/calendar'
import { Input } from '@/shared/components/ui/input'
import { cn } from '@/shared/lib/utils'
import {
	MultiStep,
	MultiStepContent,
	MultiStepNext,
	MultiStepPrev,
	MultiStepProgress,
} from '@/shared/components/ui/multi-step'
import {
	Form,
	FormField,
	FormItem,
	FormLabel,
} from '@/shared/components/ui/form'
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from '@/shared/components/ui/popover'
import {
	Command,
	CommandEmpty,
	CommandGroup,
	CommandInput,
	CommandItem,
	CommandList,
} from '@/shared/components/ui/command'

import { useGetCategories } from '@/features/category/api/get-category'
import { useGetWallet } from '@/features/wallet/api/get-wallet'

import { useCreateBudget } from '../api/create-budget'
import { budgetForm } from '../types'
import { flatten } from '../utils'

export default function BudgetForm({ children }: React.PropsWithChildren) {
	const [onFocus, setFocus] = useState(false)
	const [open, setOpen] = useState(false)

	const { data: categories } = useGetCategories({ type: 'expense' })
	const { data: wallets } = useGetWallet({})

	const { mutate } = useCreateBudget()

	const walletOptions = useMemo(() => {
		return wallets?.data?.map((i) => ({
			value: i.id,
			label: i.name,
		}))
	}, [wallets?.data])

	const form = useForm<budgetForm>({
		defaultValues: {
			name: '',
			categories: [],
			endAt: '',
			startAt: '',
			total: 0,
			walletId: '',
		},
	})

	const { fields, append, remove } = useFieldArray({
		control: form.control,
		name: 'categories',
	})

	const { total, categories: categoryWatch } = form.watch()

	const selectedCategory = categoryWatch.map((i) => i.categoryId)
	const totalCategory = categoryWatch.reduce(
		(acc, prev) => (acc = acc + Number(prev.planned)),
		0
	)

	const flatCategories = flatten(categories?.data || [])

	const onSubmit = () => {
		const data = form.getValues()
		mutate(data, {
			onSuccess: () => {
				setOpen(false)
			},
			onError: (err) => {
				console.log(err)
			},
		})
	}

	return (
		<Sheet open={open} onOpenChange={setOpen}>
			<SheetTrigger asChild>{children}</SheetTrigger>
			<SheetContent hideClose className='p-4 bg-background'>
				<Form {...form}>
					<MultiStep totalSteps={2}>
						<MultiStepProgress
							right={
								<Close>
									<ButtonClose />
								</Close>
							}
						/>
						<MultiStepContent className={'h-full'} stepIndex={0}>
							<div className='min-h-full pt-10 flex flex-col justify-between'>
								<div className='space-y-6'>
									<FormField
										control={form.control}
										name='name'
										render={({ field }) => (
											<FormItem>
												<FormLabel>Name</FormLabel>
												<Input {...field} />
											</FormItem>
										)}
									/>
									<div className='rounded-lg bg-white'>
										<FormField
											control={form.control}
											name='walletId'
											render={({ field }) => (
												<FormItem className='flex justify-between items-center p-2 border-b '>
													<div className='flex gap-1.5 items-center'>
														<IconWallet
															className='text-muted-foreground'
															size={18}
														/>
														<FormLabel className='text-base md:text-sm font-normal'>
															Wallet
														</FormLabel>
													</div>
													<Combobox
														options={walletOptions || []}
														value={field.value}
														onValueChange={field.onChange}
														notFoundContent={
															<div className='flex flex-col gap-2 px-4'>
																<p>Yang anda cari tidak ditemukan</p>
															</div>
														}
														align='end'
														trigger={
															<Button
																variant='secondary'
																role='combobox'
																className='w-fit gap-4 justify-between bg-white'
															>
																{field.value
																	? walletOptions?.find(
																			(opt) => opt.value === field.value
																	  )?.label
																	: 'Select wallet'}
																<IconSelector className='opacity-50' />
															</Button>
														}
													/>
												</FormItem>
											)}
										/>
										<FormField
											control={form.control}
											name='startAt'
											render={({ field }) => (
												<FormItem className='flex justify-between items-center p-2 border-b '>
													<div className='flex gap-1.5 items-center'>
														<CalendarIcon
															className='text-muted-foreground'
															size={18}
														/>
														<FormLabel className='text-base md:text-sm font-normal'>
															Start Date
														</FormLabel>
													</div>
													<Popover>
														<PopoverTrigger>
															<Button
																variant={'secondary'}
																className='w-fit gap-4 justify-between bg-white'
															>
																{field.value
																	? format(new Date(field.value), 'd MMM yyyy')
																	: 'Select date'}
																<IconSelector />
															</Button>
														</PopoverTrigger>
														<PopoverContent className='p-0 w-fit' align='end'>
															<Calendar
																mode='single'
																selected={new Date(field.value)}
																captionLayout='dropdown'
																onSelect={(date) => {
																	field.onChange(date)
																}}
															/>
														</PopoverContent>
													</Popover>
												</FormItem>
											)}
										/>
										<FormField
											control={form.control}
											name='endAt'
											render={({ field }) => (
												<FormItem className='flex justify-between items-center p-2'>
													<div className='flex gap-1.5 items-center'>
														<CalendarIcon
															className='text-muted-foreground'
															size={18}
														/>
														<FormLabel className='text-base md:text-sm font-normal'>
															End Date
														</FormLabel>
													</div>
													<Popover>
														<PopoverTrigger>
															<Button
																variant={'secondary'}
																className='w-fit gap-4 justify-between bg-white'
															>
																{field.value
																	? format(new Date(field.value), 'd MMM yyyy')
																	: 'Select date'}
																<IconSelector />
															</Button>
														</PopoverTrigger>
														<PopoverContent className='p-0 w-fit' align='end'>
															<Calendar
																mode='single'
																selected={new Date(field.value)}
																captionLayout='dropdown'
																onSelect={(date) => {
																	field.onChange(date)
																}}
															/>
														</PopoverContent>
													</Popover>
												</FormItem>
											)}
										/>
									</div>
								</div>
								<MultiStepNext
									children={
										<>
											<span>Next</span>
											<IconChevronRight />
										</>
									}
									placeholder='Next'
								/>
							</div>
						</MultiStepContent>
						<MultiStepContent className='h-full' stepIndex={1}>
							<div className='min-h-full pt-10 flex flex-col justify-between'>
								<div className='space-y-6'>
									<div className='space-y-3'>
										<p className='text-muted-foreground text-sm text-center mb-1.5'>
											Total Budget
										</p>
										<FormField
											control={form.control}
											name='total'
											render={({ field }) => (
												<FormItem className='flex justify-center gap-2 items-center'>
													<Button
														variant={'secondary'}
														className='w-7 h-7 border rounded-full bg-white flex justify-center items-center'
														onClick={() =>
															field.onChange(Number(field.value) - 1)
														}
													>
														<IconMinus />
													</Button>
													{!onFocus ? (
														<div
															onClick={() => setFocus(true)}
															className='cursor-text'
														>
															<AnimatedCounter
																value={total}
																fontSize='30px'
																includeDecimals={false}
																incrementColor='#187D86'
																decrementColor='#ED4F4F'
															/>
														</div>
													) : (
														<Input
															className='w-fit min-w-[120px] !text-3xl bg-transparent border-none'
															onBlur={() => setFocus(false)}
															onChange={(e) =>
																!isNaN(Number(e.target.value)) &&
																field.onChange(Number(e.target.value))
															}
															value={field.value}
															inputMode='numeric'
															autoFocus
															onKeyDown={(e) => {
																if (e.key === 'Enter') {
																	setFocus(false)
																}
															}}
														/>
													)}
													<Button
														variant={'secondary'}
														className='w-7 h-7 border rounded-full bg-white flex justify-center items-center'
														onClick={() =>
															field.onChange(Number(field.value) + 1)
														}
													>
														<IconPlus />
													</Button>
												</FormItem>
											)}
										/>
									</div>

									<div className='space-y-2'>
										<SlicedProgressBar
											data={categoryWatch.map((i) => ({
												id: i.categoryId,
												color: i.color,
												name: i.name,
												total: i.planned,
											}))}
											total={total}
										/>
										<div className='flex justify-between items-start'>
											<div className='text-left'>
												<p className='text-sm text-muted-foreground'>Planned</p>
												<p className='text-lg font-medium text-foreground'>
													{total}
												</p>
											</div>
											<div className='text-right'>
												<p className='text-sm text-muted-foreground'>
													Remaining
												</p>
												<p className='text-lg font-medium text-foreground'>
													{total - totalCategory}
												</p>
											</div>
										</div>

										<div className='bg-white rounded-lg'>
											{fields.map((item, index) => (
												<div
													className={cn(
														'p-2 flex justify-between items-center',
														index < fields.length - 1 && 'border-b'
													)}
													key={item.id}
												>
													<div>
														<p>{item.name}</p>
													</div>
													<div className='flex gap-1 items-center'>
														<FormField
															control={form.control}
															name={`categories.${index}.planned`}
															render={({ field }) => (
																<Input
																	{...field}
																	className='text-right border-transparent max-w-28'
																/>
															)}
														/>
														<Button
															className='bg-transparent hover:bg-transparent group shadow-none border-transparent hover:border-border'
															variant={'secondary'}
															onClick={() => remove(index)}
														>
															<IconTrashFilled
																className='text-[#DDDCDC] group-hover:text-red-500/90'
																size={16}
															/>
														</Button>
													</div>
												</div>
											))}
										</div>

										<Popover>
											<PopoverTrigger
												className={buttonVariants({
													className: 'w-full text-muted-foreground font-normal',
													variant: 'secondary',
												})}
											>
												<IconCategoryPlus />
												New Item
											</PopoverTrigger>
											<PopoverContent className='!w-[--radix-popover-trigger-width] p-0'>
												<Command>
													<CommandInput placeholder='Search' className='h-9' />

													<CommandList>
														<CommandEmpty>No found.</CommandEmpty>
														<CommandGroup>
															{flatCategories.map((i) => (
																<CommandItem
																	key={i.id}
																	value={i.name}
																	className={cn(
																		'flex justify-between items-center',
																		i.parentId && 'ml-4 text-foreground/80'
																	)}
																	disabled={selectedCategory.includes(i.id)}
																	onSelect={() =>
																		append({
																			categoryId: i.id,
																			name: i.name,
																			planned: 0,
																			color: i.color,
																		})
																	}
																>
																	{i.name}
																	{selectedCategory.includes(i.id) && (
																		<IconCheck />
																	)}
																</CommandItem>
															))}
														</CommandGroup>
													</CommandList>
												</Command>
											</PopoverContent>
										</Popover>
									</div>
								</div>

								<div className='flex items-center gap-2 w-full'>
									<MultiStepPrev
										className='bg-background text-foreground hover:bg-foreground/10'
										children={
											<>
												<IconChevronLeft />
												<span>Back</span>
											</>
										}
									/>
									<Button className='flex-1' onClick={onSubmit}>
										Save
									</Button>
								</div>
							</div>
						</MultiStepContent>
					</MultiStep>
				</Form>
			</SheetContent>
		</Sheet>
	)
}
