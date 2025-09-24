'use client'

import { useGetCategories } from '@/features/category/api/get-category'
import CategoryForm from '@/features/category/components/category-form'
import { Button } from '@/shared/components/ui/button'
import { Tabs, TabsList, TabsTrigger } from '@/shared/components/ui/tabs'
import { cn } from '@/shared/lib/utils'
import { TransactionType } from '@/shared/types'
import {
	IconArrowDownRight,
	IconArrowUpRight,
	IconCategoryFilled,
	IconCategoryPlus,
	IconChevronLeft,
	IconChevronRight,
	IconPencil,
} from '@tabler/icons-react'
import { useState } from 'react'

export default function Page() {
	const [type, setType] = useState<TransactionType>('expense')

	const { data } = useGetCategories({ type })

	const [activeIndex, setActiveIndex] = useState<number | null>(null)

	return (
		<div className='flex gap-4 flex-col md:flex-row'>
			<div className='flex-1'>
				<div className='flex justify-between items-center mb-4'>
					<div className='flex gap-3 items-center'>
						<IconCategoryFilled className='text-muted-foreground/50' />
						<p className='text-[15px] text-foreground'>Categories</p>
					</div>

					<Tabs defaultValue={'expense'} value={type}>
						<TabsList className='rounded-md h-fit border mx-auto'>
							<TabsTrigger
								value='expense'
								onClick={() => setType('expense')}
								className='text-base md:text-sm h-6 rounded data-[state=active]:bg-white group'
							>
								<IconArrowDownRight className='group-data-[state=active]:text-red-500' />
								Expense
							</TabsTrigger>
							<TabsTrigger
								value='income'
								onClick={() => setType('income')}
								className='text-base md:text-sm h-6 rounded data-[state=active]:bg-white group'
							>
								<IconArrowUpRight className='group-data-[state=active]:text-teal-600' />
								Income
							</TabsTrigger>
						</TabsList>
					</Tabs>
				</div>

				<div className='rounded-md overflow-hidden group mb-4 bg-white hover:bg-transparent'>
					{data?.data?.map((i, index) => {
						const isActive = activeIndex === index
						return (
							<button
								key={index}
								onClick={() => setActiveIndex(index)}
								className={cn(
									'px-4 py-2.5 flex justify-between items-center w-full transition cursor-pointer hover:bg-white group-hover:bg-muted-foreground/10 hover:!opacity-100 border-2',
									isActive
										? 'border-primary border-2'
										: 'border-b-border border-x-transparent border-t-transparent',
									index == 0 && 'rounded-t-md',
									index === data?.data?.length - 1 &&
										'rounded-b-md border-b-transparent',
									isActive &&
										index === data?.data?.length - 1 &&
										'border-b-primary',
									!!activeIndex &&
										index === activeIndex - 1 &&
										'border-b-transparent'
								)}
							>
								<div className='flex gap-2 items-center'>
									<div
										className='w-1.5 h-1.5 rounded-full'
										style={{ backgroundColor: i.color }}
									></div>
									<p className='text-foreground'>{i.name}</p>
								</div>
								<div className='flex justify-end gap-2 items-center'>
									{i.children && i.children.length > 0 && (
										<p className='text-sm text-muted-foreground w-fit pl-4'>
											{i.children.length} children
										</p>
									)}
									<IconChevronRight size={18} />
								</div>
							</button>
						)
					})}
				</div>

				<CategoryForm type={type}>
					<Button
						className='w-full hover:bg-muted-foreground/10'
						variant={'secondary'}
					>
						<IconCategoryPlus />
						Add Category
					</Button>
				</CategoryForm>
			</div>

			<div className='flex-1'>
				{activeIndex !== null && (
					<>
						<div className='flex justify-between items-center mb-4'>
							<Button
								className='h-8 w-8 hover:bg-muted-foreground/10'
								variant={'secondary'}
								onClick={() =>
									setActiveIndex((prev) =>
										prev !== null && prev > 0 ? prev - 1 : prev
									)
								}
							>
								<IconChevronLeft size={18} />
							</Button>

							<div className='flex gap-2 items-center'>
								<p className='text-foreground text-sm font-medium'>
									{data?.data?.[activeIndex]?.name}
								</p>
								<CategoryForm
									type={type}
									color={data?.data?.[activeIndex]?.color}
									name={data?.data?.[activeIndex]?.name}
									id={data?.data?.[activeIndex]?.id}
								>
									<Button
										variant={'secondary'}
										className='p-0 h-8 w-8 hover:bg-muted-foreground/10'
									>
										<IconPencil />
									</Button>
								</CategoryForm>
							</div>

							<Button
								className='h-8 w-8 hover:bg-muted-foreground/10'
								variant={'secondary'}
								onClick={() =>
									setActiveIndex((prev) =>
										prev !== null && data?.data && prev < data?.data?.length - 1
											? prev + 1
											: prev
									)
								}
							>
								<IconChevronRight size={18} />
							</Button>
						</div>

						<div
							className={cn(
								'bg-white rounded-md overflow-hidden group',
								data?.data?.[activeIndex]?.children?.length && 'mb-4'
							)}
						>
							{data?.data?.[activeIndex]?.children.map((i, idx) => (
								<div
									key={i.id}
									className={cn(
										'px-4 py-2.5 flex justify-between items-center w-full hover:bg-white group-hover:bg-muted-foreground/10 hover:!opacity-100 transition cursor-pointer',
										idx !== data?.data?.[activeIndex]?.children.length - 1
											? 'border-b border-border'
											: ''
									)}
								>
									<div className='flex gap-2 items-center'>
										<div
											className='w-1.5 h-1.5 rounded-full'
											style={{ backgroundColor: i.color }}
										></div>

										<p className='text-foreground'>{i.name}</p>
									</div>

									<CategoryForm
										type={type}
										color={i.color}
										name={i.name}
										id={i.id}
									>
										<Button
											variant={'secondary'}
											className='bg-transparent p-0 h-8 w-8 hover:bg-muted-foreground/10'
										>
											<IconPencil />
										</Button>
									</CategoryForm>
								</div>
							))}
						</div>

						<CategoryForm parentId={data?.data?.[activeIndex]?.id} type={type}>
							<Button
								className='w-full hover:bg-muted-foreground/10'
								variant={'secondary'}
							>
								<IconCategoryPlus />
								Add Children
							</Button>
						</CategoryForm>
					</>
				)}
			</div>
		</div>
	)
}
