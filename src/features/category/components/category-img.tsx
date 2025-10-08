export default function CategoryImage({
	url,
	color,
	variant = 'style-1',
}: {
	url: string
	color: string
	variant: 'style-1' | 'style-2'
}) {
	if (variant === 'style-1')
		return (
			<div className='relative w-9 h-9'>
				<div
					className='absolute w-[35px] h-[35px] rounded-full z-[1] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-muted-foreground'
					style={{ background: color }}
				></div>
				<div
					className='absolute w-9 h-9 rounded-full opacity-[88%] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[2]'
					style={{ background: 'white' }}
				></div>

				<img
					className='w-5 h-5 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[2]'
					src={url}
				/>
				<div
					className='w-8 h-8 rounded-full absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 mix-blend-lighten z-[2]'
					style={{ backgroundColor: color }}
				></div>
			</div>
		)

	return (
		<div className='relative w-9 h-9'>
			<div className='absolute w-[34px] h-[34px] rounded-full top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-gray-200'></div>
			<div
				className='absolute w-[34px] h-[34px] rounded-full top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 mix-blend-difference'
				style={{ background: color }}
			></div>
			<img
				className='w-5 h-5 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2'
				src={url}
			/>
			<div className='w-[34px] h-[34px] rounded-full absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 mix-blend-difference bg-white'></div>
			<div
				className='w-[35px] h-[35px] rounded-full absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 border-2'
				style={{
					borderColor: color,
				}}
			></div>
		</div>
	)
}
