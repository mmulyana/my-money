'use client'

import { IconCategory, IconCheck } from '@tabler/icons-react'
import { HexColorPicker } from 'react-colorful'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { Pipette } from 'lucide-react'

import DialogTopHeader from '@/shared/components/common/dialog-topheader'
import { RadioGroup, RadioGroupItem } from '@/shared/components/ui/radio-group'
import { defaultColorsPicker } from '@/shared/constants/color-picker'
import { Button } from '@/shared/components/ui/button'
import { TransactionType } from '@/shared/types'
import { imgs } from '@/shared/constants/img'
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

import { useCreateCategory } from '../api/create-category'
import { useUpdateCategory } from '../api/update-category'
import CategoryImage from './category-img'

type Form = {
	name: string
	color: string
	parentId: string | null
	type: TransactionType
	imageUrl: null | string
	imageVariant: string
}

type Props = React.PropsWithChildren & {
	type: TransactionType
	parentId?: string
	id?: string
	name?: string
	color?: string
	imageUrl?: null | string
	imageVariant?: string
}

export default function CategoryForm({
	children,
	parentId,
	type,
	name,
	id,
	color,
	imageUrl,
	imageVariant,
}: Props) {
	const [open, setOpen] = useState(false)

	const { mutate: create } = useCreateCategory()
	const { mutate: update } = useUpdateCategory()

	const form = useForm<Form>({
		defaultValues: {
			name: '',
			color: '#187D86',
			parentId: null,
			type: 'expense',
			imageUrl: imgs[0],
			imageVariant: 'style-1',
		},
	})
	const { color: colorWatch, imageVariant: imageVariantWatch } = form.watch()

	const onSubmit = (data: Form) => {
		if (!!id) {
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
		if (!open && !id) {
			form.reset({
				name: '',
				color: '#187D86',
				parentId: parentId || null,
				imageUrl: imgs[0],
				imageVariant: 'style-1',
			})
		}
	}, [open, id])

	useEffect(() => {
		if ((id && name && color && type) || imageUrl || imageVariant) {
			form.reset({
				parentId,
				name,
				color,
				type,
				imageUrl: imageUrl || imgs[0],
				imageVariant: imageVariant || 'style-1',
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
						<div className='p-4 flex flex-col gap-4'>
							<FormField
								control={form.control}
								name='name'
								render={({ field }) => (
									<FormItem className='h-14 flex flex-col justify-end w-full relative'>
										<FormLabel className=''>Name</FormLabel>
										<FormControl>
											<Input
												className='w-full bg-white shadow-none'
												{...field}
												placeholder='Type category'
											/>
										</FormControl>
									</FormItem>
								)}
							/>

							<FormField
								control={form.control}
								name='imageUrl'
								render={({ field }) => (
									<FormItem className='h-14 flex flex-col justify-end'>
										<FormLabel>Image</FormLabel>
										<Popover>
											<FormControl>
												<PopoverTrigger asChild>
													<div className='flex gap-2 items-center'>
														<CategoryImage
															color={colorWatch}
															url={field.value as string}
															variant={imageVariantWatch as any}
														/>

														<Button
															variant={'outline'}
															size={'sm'}
															className='bg-white hover:bg-muted shadow-none py-0.5 px-2 h-fit'
															type='button'
														>
															Change
														</Button>
													</div>
												</PopoverTrigger>
											</FormControl>
											<PopoverContent align='start' className='w-fit'>
												<div className='grid grid-cols-4 gap-4'>
													{imgs.map((i) => (
														<img
															key={i}
															src={i}
															className='aspect-square h-8 cursor-pointer'
															onClick={() => field.onChange(i)}
														/>
													))}
												</div>
											</PopoverContent>
										</Popover>
									</FormItem>
								)}
							/>

							<FormField
								control={form.control}
								name='color'
								render={({ field }) => (
									<FormItem className='w-full'>
										<FormLabel>Color</FormLabel>

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

							<FormField
								control={form.control}
								name='imageVariant'
								render={({ field }) => (
									<FormItem className='mb-6 space-y-2'>
										<FormLabel>Image Variant</FormLabel>
										<RadioGroup
											defaultValue='one'
											className='flex gap-4 items-center'
											value={field.value}
											onValueChange={field.onChange}
										>
											<div className='flex items-center space-x-2'>
												<RadioGroupItem value='style-1' id='style-1' />
												<FormLabel htmlFor='style-1'>Style 1</FormLabel>
											</div>
											<div className='flex items-center space-x-2'>
												<RadioGroupItem value='style-2' id='style-2' />
												<FormLabel htmlFor='style-2'>Style 2</FormLabel>
											</div>
										</RadioGroup>
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
