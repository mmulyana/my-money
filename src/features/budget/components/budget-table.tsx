'use client'

import { Fragment, useState } from 'react'
import ProgressBar from '@/shared/components/common/progress-bar'
import {
	Table,
	TableRow,
	TableBody,
	TableHead,
	TableHeader,
	TableCell,
} from '@/shared/components/ui/table'
import { ChevronDown, ChevronRight } from 'lucide-react'
import {
	IconCaretDown,
	IconCaretDownFilled,
	IconCaretUp,
	IconCaretUpFilled,
	IconDots,
	IconPencil,
	IconPlus,
	IconTrashFilled,
} from '@tabler/icons-react'
import { cn } from '@/shared/lib/utils'
import { Button } from '@/shared/components/ui/button'
import { Input } from '@/shared/components/ui/input'
import { ModeItem, ModeProvider } from '@/shared/components/ui/mode'

type Category = {
	category: string
	planned: number
	actual: number
	progress: number
}

type Budget = {
	name: string
	total: number
	remaining: number
	usage: number
	start: string
	end: string
	categories: Category[]
}

const budgets: Budget[] = [
	{
		name: 'Monthly (September)',
		total: 8000000,
		remaining: 4000000,
		usage: 28,
		start: '1 Sept',
		end: '30 Sept',
		categories: [
			{ category: 'Makan', planned: 500000, actual: 200000, progress: 28 },
			{ category: 'Makan', planned: 500000, actual: 200000, progress: 28 },
			{ category: 'Makan', planned: 500000, actual: 200000, progress: 28 },
		],
	},
	{
		name: 'Subscription',
		total: 8000000,
		remaining: 4000000,
		usage: 28,
		start: '1 Sept',
		end: '30 Sept',
		categories: [],
	},
]

export default function BudgetTable() {
	const [expandedRows, setExpandedRows] = useState<number[]>([0])

	const toggleRow = (index: number) => {
		setExpandedRows((prev) =>
			prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
		)
	}

	return (
		<div className='rounded-lg bg-white border overflow-hidden'>
			<Table>
				<TableHeader>
					<TableRow className='hover:bg-white'>
						<TableHead className='h-12 w-10'></TableHead>
						<TableHead className='h-12 w-[200px] text-foreground/80'>
							Name
						</TableHead>
						<TableHead className='h-12 w-[120px] text-foreground/80'>
							Start
						</TableHead>
						<TableHead className='h-12 w-[120px] text-foreground/80'>
							End
						</TableHead>
						<TableHead className='h-12 w-[240px] text-right text-foreground/80'>
							Total
						</TableHead>
						<TableHead className='h-12 w-[240px]'></TableHead>
						<TableHead className='h-12 w-[240px] text-right text-foreground/80'>
							Remaining
						</TableHead>
						<TableHead className='h-12 min-w-[200px] text-foreground/80'>
							Usage
						</TableHead>
						<TableHead className='h-12 w-[80px]'></TableHead>
					</TableRow>
				</TableHeader>
				<TableBody>
					{budgets.map((budget, idx) => (
						<Fragment key={idx}>
							<TableRow className='hover:bg-white'>
								<TableCell className='w-10'>
									<div className='w-full flex justify-end'>
										<Button
											size={'sm'}
											className='w-6 h-6 rounded'
											variant={'ghost'}
											onClick={() => toggleRow(idx)}
										>
											{expandedRows.includes(idx) ? (
												<IconCaretDownFilled size={16} />
											) : (
												<IconCaretUpFilled size={16} />
											)}
										</Button>
									</div>
								</TableCell>
								<TableCell className='w-[200px]'>{budget.name}</TableCell>
								<TableCell className='w-[120px]'>{budget.start}</TableCell>
								<TableCell className='w-[120px]'>{budget.end}</TableCell>
								<TableCell className='w-[240px] text-right'>
									<ModeProvider defaultKey='view'>
										<ModeItem keyName='view'>
											{({ onActivate }) => (
												<div className='flex gap-1 items-center justify-end transition-all ease-in group'>
													<p>{budget.total}</p>
													<Button
														onClick={() => onActivate('edit')}
														className='p-0 h-5 w-4 rounded hidden group-hover:flex'
														variant={'ghost'}
													>
														<IconPencil size={14} />
													</Button>
												</div>
											)}
										</ModeItem>

										<ModeItem keyName='edit'>
											{({ onActivate }) => (
												<Input
													defaultValue={budget.total}
													className='w-24 text-right h-fit py-0.5 border-x-0 rounded border-transparent border bg-muted'
													autoFocus
													onKeyDown={(e) => {
														if (e.key === 'Enter') {
															const newValue = Number(
																(e.target as HTMLInputElement).value
															)
															alert(
																`New planned value for ${budget.name}: ${newValue}`
															)
														}
													}}
													onBlur={() => onActivate('view')}
												/>
											)}
										</ModeItem>
									</ModeProvider>
								</TableCell>
								<TableCell className='w-[240px]'></TableCell>
								<TableCell className='w-[240px] text-right'>
									{budget.remaining}
								</TableCell>
								<TableCell className='w-[200px]'>
									<ProgressBar progress={budget.usage} />
								</TableCell>
								<TableCell className='w-[80px]'>
									<div className='flex justify-end pr-2'>
										<Button variant={'ghost'} size={'sm'}>
											<IconDots size={18} />
										</Button>
									</div>
								</TableCell>
							</TableRow>

							{expandedRows.includes(idx) && (
								<>
									{budget.categories.length > 0 && (
										<TableRow className='border-none bg-muted/50 hover:bg-muted'>
											<TableCell className='w-10'></TableCell>
											<TableCell className='w-[200px] text-sm text-foreground/70'>
												Category
											</TableCell>
											<TableCell className='w-[120px]'></TableCell>
											<TableCell className='w-[120px]'></TableCell>
											<TableCell className='w-[240px] text-right text-sm text-foreground/70'>
												Planned
											</TableCell>
											<TableCell className='w-[240px] text-right text-sm text-foreground/70'>
												Actual
											</TableCell>
											<TableCell className='w-[240px] text-right text-sm text-foreground/70'>
												Remaining
											</TableCell>
											<TableCell className='w-[200px]'></TableCell>
											<TableCell className='w-[80px]'></TableCell>
										</TableRow>
									)}

									{budget.categories.map((cat, i) => (
										<TableRow
											key={i}
											className={cn(
												'border-transparent bg-muted/50 hover:bg-muted'
											)}
										>
											<TableCell className={cn('w-10 py-2')}></TableCell>
											<TableCell className={cn('w-[200px]')}>
												{cat.category}
											</TableCell>
											<TableCell className={cn('w-[120px] py-2')}></TableCell>
											<TableCell className={cn('w-[120px] py-2')}></TableCell>
											<TableCell className={cn('w-[240px] py-2')}>
												<div className='flex justify-end'>
													<Input
														defaultValue={cat.planned}
														className='w-24 text-right bg-white'
														onKeyDown={(e) => {
															if (e.key === 'Enter') {
																const newValue = Number(
																	(e.target as HTMLInputElement).value
																)
																alert(
																	`New planned value for ${cat.category}: ${newValue}`
																)
															}
														}}
													/>
												</div>
											</TableCell>
											<TableCell className={cn('w-[240px] py-2 text-right')}>
												{cat.actual}
											</TableCell>
											<TableCell className={cn('w-[240px] py-2 text-right')}>
												{cat.planned - cat.actual}
											</TableCell>
											<TableCell className={cn('w-[200px] py-2')}>
												<ProgressBar progress={cat.progress} />
											</TableCell>
											<TableCell className={cn('w-[80px] py-2')}>
												<div className='w-full flex justify-end pr-2'>
													<Button
														className='bg-transparent hover:bg-transparent group shadow-none border-transparent hover:border-border w-9'
														variant={'secondary'}
														onClick={() => alert(cat.category)}
													>
														<IconTrashFilled
															className='text-[#DDDCDC] group-hover:text-red-500/80'
															size={16}
														/>
													</Button>
												</div>
											</TableCell>
										</TableRow>
									))}
									<TableRow
										className={cn(
											'border-transparent bg-muted/50 hover:bg-muted/50',
											idx < budgets.length - 1 && 'border-border'
										)}
									>
										<TableCell colSpan={9} className='py-0'>
											<Button
												size={'sm'}
												className={cn(
													'mb-4 gap-1 ml-10 hover:text-primary hover:bg-[#ECECEC]',

													budget.categories.length === 0 && 'mt-4'
												)}
												variant={'ghost'}
											>
												<IconPlus className='!w-4 !h-4' />
												<span className='text-sm'>New Category</span>
											</Button>
										</TableCell>
									</TableRow>
								</>
							)}
						</Fragment>
					))}
				</TableBody>
			</Table>
		</div>
	)
}
