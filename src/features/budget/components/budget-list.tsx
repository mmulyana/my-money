import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from '@/shared/components/ui/table'
import foodPng from '@/assets/icon/food.png'
import CircularProgress from '@/shared/components/common/circular-progress'

export default function BudgetList() {
	return (
		<div className='space-y-3'>
			<p className='text-foreground text-sm'>Budget</p>
			<Table>
				<TableHeader>
					<TableRow className='border-none'>
						<TableHead className='h-fit text-xs p-0 pb-2 font-normal text-muted-foreground'>Name</TableHead>
						<TableHead className='h-fit text-xs p-0 pb-2 font-normal text-muted-foreground'>Planned</TableHead>
						<TableHead className='h-fit text-xs p-0 pb-2 font-normal text-muted-foreground'>Actual</TableHead>
					</TableRow>
				</TableHeader>
				<TableBody>
					<TableRow className='border-none'>
						<TableCell className='p-0'>
							<div className='flex items-center gap-2 -ml-1'>
								<CircularProgress color='#F3A62B' progress={64} size={56}>
									<img src={foodPng.src} className='w-7 h-7' />
								</CircularProgress>
								<p className='text-sm text-foreground w-[88px] text-wrap'>
									Food
								</p>
							</div>
						</TableCell>
						<TableCell className='p-0'>
							<p className='text-muted-foreground'>300000</p>
						</TableCell>
						<TableCell className='p-0'>
							<p className='text-muted-foreground'>2400000</p>
						</TableCell>
					</TableRow>
					<TableRow className='border-none'>
						<TableCell className='p-0'>
							<div className='flex items-center gap-2 -ml-1'>
								<CircularProgress color='#57839E' progress={64} size={56}>
									<img src={foodPng.src} className='w-7 h-7' />
								</CircularProgress>
								<p className='text-sm text-foreground w-[88px] text-wrap'>
									Mass Transportation
								</p>
							</div>
						</TableCell>
						<TableCell className='p-0'>
							<p className='text-muted-foreground'>300000</p>
						</TableCell>
						<TableCell className='p-0'>
							<p className='text-muted-foreground'>2400000</p>
						</TableCell>
					</TableRow>
				</TableBody>
			</Table>
		</div>
	)
}
