import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from '@/shared/components/ui/tooltip'
import { cn } from '@/shared/lib/utils'

type Slice = {
	id: string | number
	name: string
	color: string
	total: number
}

type Props = {
	data: Slice[]
}

export default function SlicedProgressBar({ data }: Props) {
	const totalSum = data.reduce((acc, item) => acc + item.total, 0)

	return (
		<TooltipProvider>
			<div className='flex w-full h-3 overflow-hidden'>
				{data.map((item, index) => {
					const widthPercent = (item.total / totalSum) * 100

					let borderRadius = ''
					if (index === 0) borderRadius = 'rounded-l-full'
					else if (index === data.length - 1) borderRadius = 'rounded-r-full'
					else borderRadius = 'rounded-none'

					return (
						<Tooltip key={item.id}>
							<TooltipTrigger asChild>
								<div
									className={cn('h-full', borderRadius)}
									style={{
										width: `${widthPercent}%`,
										backgroundColor: item.color,
										border: '1.5px solid white',
									}}
								/>
							</TooltipTrigger>
							<TooltipContent>
								<p className='text-sm font-medium'>{item.name}</p>
								<p className='text-xs text-muted-foreground'>{item.total}</p>
							</TooltipContent>
						</Tooltip>
					)
				})}
			</div>
		</TooltipProvider>
	)
}
