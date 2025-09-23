import { Combobox } from '@/shared/components/common/combobox'
import { Button, buttonVariants } from '@/shared/components/ui/button'
import {
	Form,
	FormField,
	FormItem,
	FormLabel,
} from '@/shared/components/ui/form'
import { Input } from '@/shared/components/ui/input'
import { Label } from '@/shared/components/ui/label'
import {
	Sheet,
	SheetContent,
	SheetTitle,
	SheetTrigger,
} from '@/shared/components/ui/sheet'
import { Tabs, TabsList, TabsTrigger } from '@/shared/components/ui/tabs'
import { Textarea } from '@/shared/components/ui/textarea'
import { Close } from '@radix-ui/react-dialog'
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
import { ChevronsUpDown, XIcon } from 'lucide-react'
import { useForm } from 'react-hook-form'

const frameworks = [
	{ value: 'next.js', label: 'Next.js' },
	{ value: 'sveltekit', label: 'SvelteKit' },
	{ value: 'nuxt.js', label: 'Nuxt.js' },
	{ value: 'remix', label: 'Remix' },
	{ value: 'astro', label: 'Astro' },
]

export default function TransactionForm({ children }: React.PropsWithChildren) {
	const form = useForm({
		defaultValues: {
			amount: 0,
			remark: '',
			date: '',
			categoryId: '',
			walletId: '',
		},
	})

	const onSubmit = (data: any) => {}

	return (
		<Sheet defaultOpen>
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
									New Transaction
								</SheetTitle>
							</div>
							<div className='gap-2 items-center hidden md:flex'>
								<Button type='submit' className='h-7 rounded font-normal'>
									Save
								</Button>
								<Close
									type='button'
									className='ring-offset-background focus:ring-ring data-[state=open]:bg-secondary rounded opacity-70 transition-opacity hover:opacity-100 focus:ring-2 focus:ring-offset-2 focus:outline-hidden disabled:pointer-events-none h-7 bg-white px-1 border border-border'
								>
									<XIcon className='size-4' />
									<span className='sr-only'>Close</span>
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
												value={field.value}
												className='text-right px-4 py-2 shadow-none !text-4xl font-medium text-foreground h-fit border-0 !outline-0 !ring-0 rounded-none bg-gray-200'
												onChange={(e) =>
													!isNaN(Number(e.target.value)) &&
													field.onChange(Number(e.target.value))
												}
												autoFocus
											/>
										</FormItem>
									)}
								/>

								<Tabs defaultValue='expense'>
									<TabsList className='rounded-md h-fit border mx-auto'>
										<TabsTrigger
											value='expense'
											className='text-base md:text-sm px-2.5 py-0.5 h-fit rounded data-[state=active]:bg-white group'
										>
											<IconArrowDownRight className='group-data-[state=active]:text-red-500' />
											Expense
										</TabsTrigger>
										<TabsTrigger
											value='income'
											className='text-base md:text-sm px-2.5 py-0.5 h-fit rounded data-[state=active]:bg-white group'
										>
											<IconArrowUpRight className='group-data-[state=active]:text-teal-600' />
											Income
										</TabsTrigger>
										<TabsTrigger
											value='transfer'
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
														options={frameworks}
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
																	? frameworks.find(
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
														options={frameworks}
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
																	? frameworks.find(
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
