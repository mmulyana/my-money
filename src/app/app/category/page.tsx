'use client'

import { Fragment, useState } from 'react'
import {
	IconCaretDownFilled,
	IconArrowDownRight,
	IconCategoryFilled,
	IconCaretUpFilled,
	IconArrowUpRight,
	IconPencil,
	IconPlus,
} from '@tabler/icons-react'

import { useGetCategories } from '@/features/category/api/get-category'
import CategoryForm from '@/features/category/components/category-form'
import CategoryImage from '@/features/category/components/category-img'

import { Tabs, TabsList, TabsTrigger } from '@/shared/components/ui/tabs'
import { Button } from '@/shared/components/ui/button'
import { TransactionType } from '@/shared/types'
import { cn } from '@/shared/lib/utils'
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from '@/shared/components/ui/table'

export default function Page() {
	const [type, setType] = useState<TransactionType>('expense')
	const { data } = useGetCategories({ type })

	const [expandedRows, setExpandedRows] = useState<number[]>([])

	const toggleRow = (index: number) => {
		setExpandedRows((prev) =>
			prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
		)
	}

	return (
		<div className='flex gap-4 flex-col md:flex-row max-w-3xl mx-auto'>
			<div className='flex-1'>
				<div className='flex justify-between items-center mb-4'>
					<p className='text-[15px] font-medium text-foreground'>Categories</p>

					<Tabs defaultValue='expense' value={type}>
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

					<CategoryForm type={type}>
						<Button
							className='rounded text-sm gap-1 px-2.5 py-1.5 h-fit text-primary font-medium bg-[#ECECEC]'
							variant={'secondary'}
						>
							<IconPlus size={12} />
							Add Category
						</Button>
					</CategoryForm>
				</div>

				<div className='rounded-md border bg-white overflow-hidden shadow-xs'>
					<Table>
						<TableHeader>
							<TableRow>
								<TableHead className='h-12 pl-2 text-sm w-10'></TableHead>
								<TableHead className='h-12 text-sm text-foreground/80'>
									Name
								</TableHead>
								<TableHead className='h-12 text-sm text-foreground/80 text-center'>
									Sub category
								</TableHead>
								<TableHead className='h-12 text-sm text-foreground/80 text-right'></TableHead>
							</TableRow>
						</TableHeader>
						<TableBody>
							{data?.data?.map((cat, index) => {
								const isExpanded = expandedRows.includes(index)
								return (
									<Fragment key={cat.id}>
										<TableRow className='cursor-pointer'>
											<TableCell className='w-10 pl-2'>
												<Button
													size='sm'
													variant='ghost'
													className='h-6 w-6'
													onClick={() => toggleRow(index)}
												>
													{isExpanded ? (
														<IconCaretUpFilled size={16} />
													) : (
														<IconCaretDownFilled size={16} />
													)}
												</Button>
											</TableCell>
											<TableCell className='font-medium'>
												<div className='flex items-center gap-4 relative'>
													{cat.imageUrl && cat.imageVariant && (
														<CategoryImage
															color={cat.color}
															url={cat.imageUrl}
															variant={cat.imageVariant as any}
														/>
													)}
													<p>{cat.name}</p>
												</div>
											</TableCell>
											<TableCell className='text-muted-foreground text-center'>
												{cat?.children?.length > 0 &&
													`${cat?.children?.length}`}
											</TableCell>
											<TableCell className='text-right pr-4'>
												<CategoryForm
													type={type}
													id={cat.id}
													color={cat.color}
													name={cat.name}
													imageUrl={cat.imageUrl}
													imageVariant={cat.imageVariant as any}
												>
													<Button
														size='sm'
														variant='ghost'
														className='h-6 w-6 hover:bg-foreground/10'
													>
														<IconPencil size={16} />
													</Button>
												</CategoryForm>
											</TableCell>
										</TableRow>

										{isExpanded && (
											<>
												{cat.children.map((child, index) => (
													<TableRow
														key={child.id}
														className={cn('border-transparent bg-muted hover:bg-foreground/10')}
													>
														<TableCell></TableCell>
														<TableCell>
															<div className='flex items-center gap-4 ml-2'>
																{child.imageUrl && child.imageVariant && (
																	<CategoryImage
																		color={child.color}
																		url={child.imageUrl}
																		variant={child.imageVariant as any}
																	/>
																)}
																<p className='text-sm'>{child.name}</p>
															</div>
														</TableCell>
														<TableCell className='text-muted-foreground'></TableCell>
														<TableCell className='text-right pr-4'>
															<CategoryForm
																type={type}
																id={child.id}
																color={child.color}
																name={child.name}
																imageUrl={child.imageUrl}
																imageVariant={child.imageVariant as any}
																parentId={cat.id}
															>
																<Button
																	size='sm'
																	variant='ghost'
																	className='h-6 w-6 hover:bg-foreground/10'
																>
																	<IconPencil size={16} />
																</Button>
															</CategoryForm>
														</TableCell>
													</TableRow>
												))}
												<TableRow>
													<TableCell
														className={cn('border-transparent bg-muted')}
														colSpan={4}
													>
														<div className='pl-12 block w-full'>
															<CategoryForm type={type} parentId={cat.id}>
																<Button
																	className='rounded-md text-[13px] gap-1 !pl-1.5 pr-2.5 py-1.5 h-fit text-primary font-medium'
																	variant={'secondary'}
																>
																	<IconPlus size={12} />
																	Add Sub Category
																</Button>
															</CategoryForm>
														</div>
													</TableCell>
												</TableRow>
											</>
										)}
									</Fragment>
								)
							})}
						</TableBody>
					</Table>
				</div>
			</div>
		</div>
	)
}
