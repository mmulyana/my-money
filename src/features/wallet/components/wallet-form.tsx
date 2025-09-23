'use client'

import { IconCheck, IconWallet } from '@tabler/icons-react'
import { HexColorPicker } from 'react-colorful'
import { Close } from '@radix-ui/react-dialog'
import { useForm } from 'react-hook-form'
import { Pipette } from 'lucide-react'

import ButtonClose from '@/shared/components/common/button-close'
import { Button } from '@/shared/components/ui/button'
import { Input } from '@/shared/components/ui/input'
import {
	Dialog,
	DialogTitle,
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
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from '@/shared/components/ui/popover'

const colors = ['#4342DA', '#21BE66', '#F06029', '#DA3955', '#EBC805']

export default function WalletForm({ children }: React.PropsWithChildren) {
	const form = useForm({
		defaultValues: {
			name: '',
			color: '#187D86',
		},
	})

	const colorWatch = form.watch('color')

	const onSubmit = (data: any) => {}

	return (
		<Dialog>
			<DialogTrigger asChild>{children}</DialogTrigger>
			<DialogContent className='p-0 bg-background'>
				<Form {...form}>
					<form onSubmit={form.handleSubmit(onSubmit)}>
						<div className='p-3 border-b flex justify-between items-center bg-white rounded-t-lg'>
							<div className='flex gap-2 items-center'>
								<IconWallet size={18} />
								<DialogTitle className='text-foreground text-base md:text-sm'>
									New Wallet
								</DialogTitle>
							</div>
							<Close>
								<ButtonClose />
							</Close>
						</div>
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
												{colors.map((color, index) => {
													const isSelected = field.value === color
													return (
														<button
															key={index}
															role='radio'
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
													<PopoverTrigger className='h-[34px] w-[34px] rounded-md transition p-1 border focus:outline-none focus:ring-2 focus:ring-offset-2 ring-gray-400'>
														<div
															className='h-full w-full rounded-full flex justify-center items-center'
															style={{
																backgroundColor: !colors.includes(colorWatch)
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
							<Button className='w-full'>Save</Button>
						</div>
					</form>
				</Form>
			</DialogContent>
		</Dialog>
	)
}
