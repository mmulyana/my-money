import { IconX } from '@tabler/icons-react'

export default function ButtonClose() {
	return (
		<div className='cursor-pointer hover:bg-muted-foreground/10 rounded h-7 w-7 flex justify-center items-center'>
			<IconX size={18} />
		</div>
	)
}
