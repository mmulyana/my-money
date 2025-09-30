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
		categories: [
			{ category: 'Netflix', planned: 150000, actual: 150000, progress: 100 },
		],
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
								</TableCell>
								<TableCell className='w-[200px]'>{budget.name}</TableCell>
								<TableCell className='w-[120px]'>{budget.start}</TableCell>
								<TableCell className='w-[120px]'>{budget.end}</TableCell>
								<TableCell className='w-[240px] text-right'>
									<ModeProvider defaultKey='view'>
										<ModeItem keyName='view'>
											{({ onActivate }) => (
												<p onClick={() => onActivate('edit')}>{budget.total}</p>
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

							{expandedRows.includes(idx) && budget.categories.length > 0 && (
								<>
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

									{budget.categories.map((cat, i) => (
										<TableRow
											key={i}
											className={cn(
												'border-transparent bg-muted/50 hover:bg-muted',
												i === budget.categories.length - 1 && 'border-border'
											)}
										>
											<TableCell className={cn('w-10 py-2')}></TableCell>
											<TableCell
												className={cn('w-[200px] flex items-center gap-2 py-2')}
											>
												{cat.category}
											</TableCell>
											<TableCell className={cn('w-[120px] py-2')}></TableCell>
											<TableCell className={cn('w-[120px] py-2')}></TableCell>
											<TableCell className={cn('w-[240px] py-2')}>
												<div className='flex justify-end'>
													<Input
														defaultValue={cat.planned}
														className='w-24 text-right'
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
											<TableCell className={cn('w-[80px] py-2')}></TableCell>
										</TableRow>
									))}
								</>
							)}
						</Fragment>
					))}
				</TableBody>
			</Table>
		</div>
	)
}
