'use client'

import CategoryForm from '@/features/category/components/category-form'
import { Button } from '@/shared/components/ui/button'
import { Tabs, TabsList, TabsTrigger } from '@/shared/components/ui/tabs'
import { cn } from '@/shared/lib/utils'
import {
	IconArrowDownRight,
	IconArrowUpRight,
	IconCategoryFilled,
	IconCategoryPlus,
	IconChevronLeft,
	IconChevronRight,
} from '@tabler/icons-react'
import { useState } from 'react'

export default function Page() {
	const [activeIndex, setActiveIndex] = useState<number | null>(null)

	const categories = [
		{
			title: 'Eat & Drink',
			color: 'bg-blue-500',
			children: ['Food', 'Water', 'Snack'],
		},
		{
			title: 'Entertainment',
			color: 'bg-teal-500',
			children: ['Movie', 'Games'],
		},
		{ title: 'Electricity', color: 'bg-cyan-500', children: ['PLN', 'Tokens'] },
		{
			title: 'Health',
			color: 'bg-amber-500',
			children: ['Medicine', 'Checkup'],
		},
	]

	return (
		<div className='flex gap-4 flex-col md:flex-row'>
			<div className='flex-1'>
				<div className='flex justify-between items-center mb-4'>
					<div className='flex gap-3 items-center'>
						<IconCategoryFilled className='text-muted-foreground/50' />
						<p className='text-[15px] text-foreground'>Categories</p>
					</div>

					<Tabs defaultValue='expense'>
						<TabsList className='rounded-md h-fit border mx-auto'>
							<TabsTrigger
								value='expense'
								className='text-base md:text-sm h-6 rounded data-[state=active]:bg-white group'
							>
								<IconArrowDownRight className='group-data-[state=active]:text-red-500' />
								Expense
							</TabsTrigger>
							<TabsTrigger
								value='income'
								className='text-base md:text-sm h-6 rounded data-[state=active]:bg-white group'
							>
								<IconArrowUpRight className='group-data-[state=active]:text-teal-600' />
								Income
							</TabsTrigger>
						</TabsList>
					</Tabs>
				</div>

				<div className='rounded-md overflow-hidden group mb-4 bg-white hover:bg-transparent'>
					{categories.map((cat, index) => {
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
									index === categories.length - 1 &&
										'rounded-b-md border-b-transparent',
									isActive &&
										index === categories.length - 1 &&
										'border-b-primary',
									!!activeIndex &&
										index === activeIndex - 1 &&
										'border-b-transparent'
								)}
							>
								<div className='flex gap-2 items-center'>
									<div
										className={`w-1.5 h-1.5 rounded-full ${cat.color}`}
									></div>
									<p className='text-foreground'>{cat.title}</p>
								</div>
								<div className='flex justify-end gap-2 items-center'>
									{cat.children && cat.children.length > 0 && (
										<p className='text-sm text-muted-foreground w-fit pl-4'>
											{cat.children.length} children
										</p>
									)}
									<IconChevronRight size={18} />
								</div>
							</button>
						)
					})}
				</div>

				<CategoryForm>
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

							<p className='text-foreground text-sm'>
								{categories[activeIndex].title}
							</p>

							<Button
								className='h-8 w-8 hover:bg-muted-foreground/10'
								variant={'secondary'}
								onClick={() =>
									setActiveIndex((prev) =>
										prev !== null && prev < categories.length - 1
											? prev + 1
											: prev
									)
								}
							>
								<IconChevronRight size={18} />
							</Button>
						</div>

						<div className='bg-white rounded-md overflow-hidden group mb-4'>
							{categories[activeIndex].children.map((child, i) => (
								<button
									key={i}
									className={`px-4 py-2.5 flex justify-between items-center w-full 
									${
										i !== categories[activeIndex].children.length - 1
											? 'border-b border-border'
											: ''
									}
									hover:bg-white group-hover:bg-muted-foreground/10 hover:!opacity-100 transition cursor-pointer
								`}
								>
									<p className='text-foreground'>{child}</p>
								</button>
							))}
						</div>

						<CategoryForm parentId={categories[activeIndex].title}>
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
