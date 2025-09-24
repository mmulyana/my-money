import { Close } from '@radix-ui/react-dialog'
import { ComponentType } from 'react'

import { DialogTitle } from '../ui/dialog'
import ButtonClose from './button-close'

export default function DialogTopHeader({
	icon: Icon,
	title,
}: {
	icon?: ComponentType<any>
	title: string
}) {
	return (
		<div className='p-3 border-b flex justify-between items-center bg-white rounded-t-lg'>
			<div className='flex gap-2 items-center'>
				{Icon && <Icon size={18} />}
				<DialogTitle className='text-foreground text-base md:text-sm'>
					{title}
				</DialogTitle>
			</div>
			<Close>
				<ButtonClose />
			</Close>
		</div>
	)
}
