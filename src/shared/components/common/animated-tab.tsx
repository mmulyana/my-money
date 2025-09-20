'use client'

import { useState, useRef, useEffect } from 'react'
import { cn } from '@/shared/lib/utils'

type Tab = {
	name: string
	onClick: () => void
}

interface AnimatedTabProps {
	tabs: Tab[]
	defaultActiveIndex?: number
	activeIndex?: number
	onChange?: (index: number) => void
}

export default function AnimatedTab({
	tabs,
	defaultActiveIndex = 0,
	activeIndex: controlledActiveIndex,
	onChange,
}: AnimatedTabProps) {
	const [uncontrolledActiveIndex, setUncontrolledActiveIndex] =
		useState(defaultActiveIndex)
	const activeIndex = controlledActiveIndex ?? uncontrolledActiveIndex

	const [activeStyle, setActiveStyle] = useState({ left: '0px', width: '0px' })
	const tabRefs = useRef<(HTMLDivElement | null)[]>([])

	// Active indicator
	useEffect(() => {
		const activeElement = tabRefs.current[activeIndex]
		if (activeElement) {
			const { offsetLeft, offsetWidth } = activeElement
			setActiveStyle({
				left: `${offsetLeft}px`,
				width: `${offsetWidth}px`,
			})
		}
	}, [activeIndex])

	return (
		<div className='flex items-center w-full'>
			<div className='relative'>
				<div
					className='absolute z-10 bottom-0 transition-all duration-300 ease-out flex justify-center'
					style={activeStyle}
				>
					<div className='h-1 rounded-lg bg-primary w-4' />
				</div>

				<div className='relative flex gap-4 items-center'>
					{tabs.map((tab, index) => (
						<div
							key={index}
							ref={(el) => {
								tabRefs.current[index] = el
							}}
							className={cn(
								'cursor-pointer transition-colors duration-300 pb-2',
								index === activeIndex ? 'text-foreground' : 'text-foreground/50'
							)}
							onClick={() => {
								if (controlledActiveIndex === undefined) {
									setUncontrolledActiveIndex(index)
								}
								onChange?.(index)
								tab.onClick()
							}}
						>
							<div className='text-sm leading-5 whitespace-nowrap flex items-center justify-center h-full'>
								{tab.name}
							</div>
						</div>
					))}
				</div>
			</div>
		</div>
	)
}
