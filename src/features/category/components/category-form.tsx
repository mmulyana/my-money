import DialogTopHeader from '@/shared/components/common/dialog-topheader'
import { Button } from '@/shared/components/ui/button'
import {
	Dialog,
	DialogContent,
	DialogTrigger,
} from '@/shared/components/ui/dialog'
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
} from '@/shared/components/ui/form'
import { Input } from '@/shared/components/ui/input'
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from '@/shared/components/ui/popover'
import { defaultColorsPicker } from '@/shared/constants/color-picker'
import { TransactionType } from '@/shared/types'
import { IconCategory, IconCheck } from '@tabler/icons-react'
import { Pipette } from 'lucide-react'
import { useEffect, useState } from 'react'
import { HexColorPicker } from 'react-colorful'
import { useForm } from 'react-hook-form'
import { useCreateCategory } from '../api/create-category'
import { useUpdateCategory } from '../api/update-category'

type Form = {
	name: string
	color: string
	parentId: string | null
	type: TransactionType
}

export default function CategoryForm({
	children,
	parentId,
	type,
	name,
	id,
	color,
}: React.PropsWithChildren & {
	type: TransactionType
	parentId?: string
	id?: string
	name?: string
	color?: string
}) {
	const [open, setOpen] = useState(false)

	const { mutate: create } = useCreateCategory()
	const { mutate: update } = useUpdateCategory()

	const form = useForm<Form>({
		defaultValues: {
			name: '',
			color: '#187D86',
			parentId: null,
			type: 'expense',
		},
	})
	const colorWatch = form.watch('color')

	const onSubmit = (data: Form) => {
		console.log('test 2')
		if (!!id) {
			console.log('test 3')
			update(
				{ ...data, id },
				{
					onSuccess: () => {
						setOpen(false)
					},
					onError: (err) => {
						console.log(err)
					},
				}
			)
			return
		}
		create(
			{ ...data, type },
			{
				onSuccess: () => {
					setOpen(false)
				},
			}
		)
	}

	useEffect(() => {
		if (!open) {
			form.reset({
				name: '',
				color: '#187D86',
				parentId: parentId || null,
			})
		}
	}, [open])

	useEffect(() => {
		if (id && name && color && type) {
			form.reset({
				parentId,
				name,
				color,
				type,
			})
		}
	}, [parentId, id, name, color, type])

	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<DialogTrigger asChild>{children}</DialogTrigger>
			<DialogContent className='p-0 bg-background'>
				<Form {...form}>
					<form onSubmit={form.handleSubmit(onSubmit)}>
						<DialogTopHeader
							title={!!parentId ? 'New Child Category' : 'New Category'}
							icon={IconCategory}
						/>
						<div className='p-4'>
							<FormField
								control={form.control}
								name='name'
								render={({ field }) => (
									<FormItem className='w-full mb-4'>
										<FormLabel>Name</FormLabel>
										<FormControl>
											<Input className='w-full bg-white' {...field} />
										</FormControl>
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name='color'
								render={({ field }) => (
									<FormItem className='w-full mb-6'>
										<FormLabel>Color</FormLabel>
										<FormControl>
											<Input className='bg-white' {...field} />
										</FormControl>
										<div className='flex gap-2 items-center flex-wrap mt-2'>
											<div
												role='radiogroup'
												className='flex flex-wrap md:grid md:grid-cols-10 gap-2'
											>
												{defaultColorsPicker.map((color, index) => {
													const isSelected = field.value === color
													return (
														<button
															key={index}
															role='radio'
															type='button'
															aria-checked={isSelected}
															className='h-[34px] w-[34px] rounded-md transition p-1 border focus:outline-none focus:ring-2 focus:ring-offset-2 ring-gray-400'
															onClick={() => field.onChange(color)}
														>
															<div
																className='h-full w-full rounded-full flex justify-center items-center'
																style={{ backgroundColor: color }}
															>
																{isSelected && (
																	<IconCheck
																		size={14}
																		strokeWidth={3}
																		color='#fff'
																	/>
																)}
															</div>
														</button>
													)
												})}
												<Popover>
													<PopoverTrigger
														type='button'
														className='h-[34px] w-[34px] rounded-md transition p-1 border focus:outline-none focus:ring-2 focus:ring-offset-2 ring-gray-400'
													>
														<div
															className='h-full w-full rounded-full flex justify-center items-center'
															style={{
																backgroundColor: !defaultColorsPicker.includes(
																	colorWatch
																)
																	? colorWatch
																	: '#333333',
															}}
														>
															<Pipette size={14} className='text-white' />
														</div>
													</PopoverTrigger>
													<PopoverContent className='p-0 w-fit'>
														<HexColorPicker
															color={colorWatch}
															onChange={(e) => form.setValue('color', e)}
														/>
													</PopoverContent>
												</Popover>
											</div>
										</div>
									</FormItem>
								)}
							/>
							<Button
								className='w-full'
								type='submit'
								onClick={() => {
									console.log('test')
								}}
							>
								Save
							</Button>
						</div>
					</form>
				</Form>
			</DialogContent>
		</Dialog>
	)
}
