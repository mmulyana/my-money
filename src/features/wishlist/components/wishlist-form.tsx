import {
	IconAlignJustified,
	IconChevronLeft,
	IconSelector,
	IconTargetArrow,
} from '@tabler/icons-react'
import { Close } from '@radix-ui/react-dialog'
import { useForm } from 'react-hook-form'
import { useState } from 'react'

import { Button, buttonVariants } from '@/shared/components/ui/button'
import ButtonClose from '@/shared/components/common/button-close'
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/shared/components/ui/form'
import {
	Sheet,
	SheetTitle,
	SheetContent,
	SheetTrigger,
} from '@/shared/components/ui/sheet'
import { Input } from '@/shared/components/ui/input'
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from '@/shared/components/ui/popover'
import { format } from 'date-fns'
import { CalendarIcon } from 'lucide-react'
import { Calendar } from '@/shared/components/ui/calendar'
import { Textarea } from '@/shared/components/ui/textarea'
import { useCreateWishlist } from '../api/create-wishlist'

type Form = {
	name: string
	total: number | bigint
	description?: string
	deadlineAt: Date | string
}

type Props = React.PropsWithChildren & {}
export default function WishlistForm({ children }: Props) {
	const [open, setOpen] = useState(false)

	const { mutate } = useCreateWishlist()

	const form = useForm<Form>({
		defaultValues: {
			deadlineAt: '',
			description: '',
			name: '',
			total: 0,
		},
	})

	const onSubmit = (data: Form) => {
		mutate(
			{ ...data, total: data.total.toString() },
			{
				onSuccess: () => {
					setOpen(false)
				},
			}
		)
	}

	return (
		<Sheet open={open} onOpenChange={setOpen}>
			<SheetTrigger asChild>{children}</SheetTrigger>
			<SheetContent
				className='h-full w-full md:w-[400px] bg-background'
				hideClose
			>
				<Form {...form}>
					<form
						onSubmit={form.handleSubmit(onSubmit)}
						className='flex flex-col h-full'
					>
						<div className='px-4 py-2 border-b border-border flex justify-between items-center shrink-0 bg-white'>
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
									New Wishlist
								</SheetTitle>
							</div>
							<div className='gap-2 items-center hidden md:flex'>
								<Button type='submit' className='h-7 rounded font-normal'>
									Save
								</Button>
								<Close type='button'>
									<ButtonClose />
								</Close>
							</div>
						</div>
						<div className='p-4 flex flex-col gap-6'>
							<FormField
								control={form.control}
								name='name'
								render={({ field }) => (
									<FormItem>
										<FormLabel>Name</FormLabel>
										<FormControl>
											<Input {...field} className='bg-white' />
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<div className='rounded-lg bg-white'>
								<FormField
									control={form.control}
									name='total'
									render={({ field }) => (
										<FormItem className='flex justify-between items-center p-2 border-b '>
											<div className='flex gap-1.5 items-center'>
												<IconTargetArrow
													className='text-muted-foreground'
													size={18}
												/>
												<FormLabel className='text-base md:text-sm font-normal'>
													Total
												</FormLabel>
											</div>
											<FormControl>
												<Input
													{...field}
													value={field.value as number}
													className='w-44 text-right bg-muted'
												/>
											</FormControl>
										</FormItem>
									)}
								/>
								<FormField
									control={form.control}
									name='deadlineAt'
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
												<PopoverTrigger asChild>
													<Button
														type='button'
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
									name='description'
									render={({ field }) => (
										<FormItem className='p-2'>
											<div className='flex gap-1.5 items-center'>
												<IconAlignJustified size={18} />
												<FormLabel className='text-base md:text-sm font-normal'>
													Description
												</FormLabel>
											</div>
											<Textarea
												value={field.value}
												onChange={field.onChange}
												className='bg-muted'
											/>
										</FormItem>
									)}
								/>
							</div>
						</div>
					</form>
				</Form>
			</SheetContent>
		</Sheet>
	)
}
