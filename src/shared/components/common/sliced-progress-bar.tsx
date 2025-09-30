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
	total?: number
}

export default function SlicedProgressBar({ data, total }: Props) {
	const totalSum = total ?? data.reduce((acc, item) => acc + item.total, 0)

	return (
		<TooltipProvider>
			<div className='flex w-full h-3 overflow-hidden rounded-full relative bg-[#DDDCDC]'>
				{data.map((item, index) => {
					const widthPercent = (item.total / totalSum) * 100

					return (
						<Tooltip key={item.id}>
							<TooltipTrigger asChild>
								<div
									className={cn(
										'h-full rounded-full absolute top-0 left-0 transition-all ease-in'
									)}
									style={{
										width: `calc(${widthPercent}% + 8px)`,
										backgroundColor: item.color,
										marginLeft: index === 0 ? 0 : -8,
										zIndex: data.length - index,
										position: 'relative',
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
