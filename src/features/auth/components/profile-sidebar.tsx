import { Button } from '@/shared/components/ui/button'
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from '@/shared/components/ui/popover'
import { IconLogout, IconSettings } from '@tabler/icons-react'
import { ChevronsUpDown } from 'lucide-react'
import { useGetMe } from '../api/get-me'

export default function ProfileSidebar() {
	const { data } = useGetMe()
	console.log('data', data?.data)
	return (
		<Popover>
			<PopoverTrigger asChild>
				<div className='flex justify-between items-center p-2 rounded hover:bg-muted-foreground/5 mt-auto w-full cursor-pointer'>
					<div className='flex items-center gap-2'>
						<div className='h-8 w-8 rounded bg-gray-300'></div>
						<p className='text-base font-medium'>mulyana</p>
					</div>
					<button>
						<ChevronsUpDown size={18} />
					</button>
				</div>
			</PopoverTrigger>
			<PopoverContent className='w-[210px] p-2 space-y-2'>
				<div className='flex items-center gap-2 border-b pb-2'>
					<div className='h-8 w-8 rounded bg-gray-300'></div>
					<p className='text-base leading-none'>mulyana</p>
				</div>
				<Button
					className='w-full justify-start rounded bg-transparent'
					variant={'secondary'}
				>
					<IconSettings />
					Setting
				</Button>
				<Button
					className='w-full justify-start rounded bg-transparent hover:text-red-500'
					variant={'secondary'}
				>
					<IconLogout />
					Logout
				</Button>
			</PopoverContent>
		</Popover>
	)
}
