import { Wallet } from '../types'

export default function WalletBadge(props: { data?: Wallet }) {
	return (
		<div className='flex gap-[3px] w-fit items-center bg-foreground/5 rounded-full h-5 px-2'>
			<div
				className='h-[5px] w-[5px] rounded-full'
				style={{
					backgroundColor: props?.data?.color,
				}}
			></div>
			<p className='text-xs text-foreground/70 font-medium'>
				{props?.data?.name}
			</p>
		</div>
	)
}
