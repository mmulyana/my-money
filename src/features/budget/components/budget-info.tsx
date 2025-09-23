'use client'

import ProgressBar from '@/shared/components/common/progress-bar'
import SlicedProgressBar from '@/shared/components/common/sliced-progress-bar'
import {
	IconChevronDown,
	IconChevronUp,
	IconMap,
	IconPencil,
} from '@tabler/icons-react'
import { useState } from 'react'

export default function BudgetInfo() {
	const [open, setOpen] = useState(true)

	return (
		<div className='bg-white p-4 rounded-lg group relative transition-all ease-in'>
			<div className='flex justify-between items-center mb-2'>
				<div className='flex gap-2 items-center'>
					<IconMap size={16} className='text-[#2B88F3]' />
					<span className='text-sm font-medium text-foreground'>Budget</span>
				</div>
				<button className='right-4 absolute cursor-pointer group-hover:flex hidden text-xs text-foreground gap-0.5 transition-all ease-in hover:gap-1 px-1.5 py-1 rounded hover:bg-gray-100 roundedlg'>
					<IconPencil size={16} />
					Manage
				</button>
			</div>

			<div className='flex justify-between mb-4'>
				<div className='text-left'>
					<p className='text-muted-foreground/80 text-xs'>Remaining</p>
					<p className='text-base font-medium text-foreground'>Rp 4,600,000</p>
				</div>
				<div className='text-right'>
					<p className='text-muted-foreground/80 text-xs'>Total</p>
					<p className='text-base font-medium text-foreground'>Rp 4,600,000</p>
				</div>
			</div>

			<SlicedProgressBar
				data={[
					{ id: 1, name: 'Blue Light', color: '#3b82f6', total: 40 },
					{ id: 2, name: 'Blue Dark', color: '#2563eb', total: 20 },
					{ id: 3, name: 'Orange', color: '#f97316', total: 60 },
					{ id: 4, name: 'Red', color: '#ef4444', total: 25 },
				]}
			/>

			<div className='space-y-2 mt-4'>
				{open && (
					<>
						<div className='flex justify-between'>
							<p className='text-xs text-muted-foreground/60'>Category</p>
							<p className='text-xs text-muted-foreground/60 text-right'>
								Remaining
							</p>
						</div>
						<div className='space-y-3'>
							<div className='flex justify-between items-center'>
								<div className='flex gap-2 items-center text-wrap w-[120px]'>
									<div className='w-1.5 h-1.5 rounded-full bg-blue-500'></div>
									<p className='text-sm text-foreground/80'>Food</p>
								</div>
								<div className='flex justify-center'>
									<div className='w-32'>
										<ProgressBar progress={22} />
									</div>
								</div>
								<div className='w-[120px]'>
									<p className='text-sm text-foreground text-right'>
										Rp 1,400,000
									</p>
								</div>
							</div>

							<div className='flex justify-between items-center'>
								<div className='flex gap-2 items-center text-wrap w-[120px]'>
									<div className='w-1.5 h-1.5 rounded-full bg-red-500'></div>
									<p className='text-sm text-foreground/80'>Entertainment</p>
								</div>
								<div className='flex justify-center'>
									<div className='w-32'>
										<ProgressBar progress={72} />
									</div>
								</div>
								<div className='w-[120px]'>
									<p className='text-sm text-foreground text-right'>
										Rp 1,400,000
									</p>
								</div>
							</div>

							<div className='flex justify-between items-center'>
								<div className='flex gap-2 items-center text-wrap w-[120px]'>
									<div className='w-1.5 h-1.5 rounded-full bg-red-500'></div>
									<p className='text-sm text-foreground/80'>Home Maintenance</p>
								</div>
								<div className='flex justify-center'>
									<div className='w-32'>
										<ProgressBar progress={72} />
									</div>
								</div>
								<div className='w-[120px]'>
									<p className='text-sm text-foreground text-right'>
										Rp 1,400,000
									</p>
								</div>
							</div>
						</div>
					</>
				)}

				<button onClick={() => setOpen(!open)} className='-mb-1 mx-auto flex !pl-1 pr-1.5 h-fit py-1.5 bg-transparent hover:bg-gray-100 cursor-pointer rounded-lg gap-0.5 hover:gap-1 ease-in transition-all'>
					{!open ? <IconChevronDown size={16} /> : <IconChevronUp size={16} />}
					<span className='text-xs'>{!open ? 'Open' : 'Hide'}</span>
				</button>
			</div>
		</div>
	)
}
