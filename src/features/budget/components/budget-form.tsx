import { useFieldArray, useForm } from 'react-hook-form'

import {
	MultiStep,
	MultiStepContent,
	MultiStepNext,
	MultiStepPrev,
	MultiStepProgress,
} from '@/shared/components/ui/multi-step'
import { Sheet, SheetContent, SheetTrigger } from '@/shared/components/ui/sheet'

import { budgetForm } from '../types'
import { Close } from '@radix-ui/react-dialog'
import ButtonClose from '@/shared/components/common/button-close'
import {
	Form,
	FormField,
	FormItem,
	FormLabel,
} from '@/shared/components/ui/form'
import { Input } from '@/shared/components/ui/input'
import { useGetWallet } from '@/features/wallet/api/get-wallet'
import { Fragment, useMemo, useState } from 'react'
import { Combobox } from '@/shared/components/common/combobox'
import { Button, buttonVariants } from '@/shared/components/ui/button'
import {
	IconCategoryPlus,
	IconChevronLeft,
	IconChevronRight,
	IconMinus,
	IconPlus,
	IconSelector,
	IconTrashFilled,
	IconWallet,
} from '@tabler/icons-react'
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from '@/shared/components/ui/popover'
import { format } from 'date-fns'
import { Calendar } from '@/shared/components/ui/calendar'
import { CalendarIcon } from 'lucide-react'
import { AnimatedCounter } from 'react-animated-counter'
import SlicedProgressBar from '@/shared/components/common/sliced-progress-bar'
import {
	Command,
	CommandEmpty,
	CommandGroup,
	CommandInput,
	CommandItem,
	CommandList,
} from '@/shared/components/ui/command'
import { cn } from '@/shared/lib/utils'

type Category = {
	value: string
	label: string
	color: string
	parentId: null | string
	children?: Category[]
}

const categories: Category[] = [
	{
		value: '1',
		label: 'Makan',
		color: '#3b82f6',
		parentId: null,
		children: [
			{
				value: '2',
				label: 'Nasi Padang',
				parentId: '1',
				color: '#f97316',
			},
		],
	},
	{
		value: '3',
		label: 'Minum',
		parentId: null,
		color: '#2563eb',
	},
]

export default function BudgetForm({ children }: React.PropsWithChildren) {
	const { data: wallets } = useGetWallet({})
	const [onFocus, setFocus] = useState(false)

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
			endDate: '',
			startDate: '',
			total: 0,
			walletId: '',
		},
	})

	const { fields, append, remove } = useFieldArray({
		control: form.control,
		name: 'categories',
	})

	const { total, categories: categoryWatch } = form.watch()

	const selectedCategory = categoryWatch.map((i) => i.category_id)
	const totalCategory = categoryWatch.reduce(
		(acc, prev) => (acc = acc + Number(prev.total)),
		0
	)

	function flatten(items: Category[], acc: Category[] = []): Category[] {
		for (const item of items) {
			acc.push(item)
			if (item.children) {
				flatten(item.children, acc)
			}
		}
		return acc
	}

	const flatCategories = flatten(categories)

	return (
		<Sheet>
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
											name='startDate'
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
											name='endDate'
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
												id: i.category_id,
												color: i.color,
												name: i.label,
												total: i.total,
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
														<p>{item.label}</p>
													</div>
													<div className='flex gap-1 items-center'>
														<FormField
															control={form.control}
															name={`categories.${index}.total`}
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
															{flatCategories
																.filter(
																	(i) => !selectedCategory.includes(i.value)
																)
																.map((i) => (
																	<CommandItem
																		key={i.value}
																		value={i.label}
																		className={cn(
																			i.parentId && 'text-red-500 border ml-10'
																		)}
																		onSelect={() =>
																			append({
																				category_id: i.value,
																				label: i.label,
																				total: 0,
																				color: i.color,
																			})
																		}
																	>
																		{i.label}
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
									<Button className='flex-1'>Save</Button>
								</div>
							</div>
						</MultiStepContent>
					</MultiStep>
				</Form>
			</SheetContent>
		</Sheet>
	)
}
