import { IconDots, IconPencil, IconTrashFilled } from '@tabler/icons-react'

import CategoryImage from '@/features/category/components/category-img'

import { Button } from '@/shared/components/ui/button'
import { imgs } from '@/shared/constants/img'
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from '@/shared/components/ui/popover'

import { Wallet } from '../types'
import WalletForm from './wallet-form'
import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
	AlertDialogTrigger,
} from '@/shared/components/ui/alert-dialog'
import { useDeleteWallet } from '../api/delete-wallet'

export default function WalletItem({ data }: { data?: Wallet }) {
	const { mutate: destroy } = useDeleteWallet()

	return (
		<div className='rounded-lg bg-white p-4 flex flex-col gap-1 relative'>
			<CategoryImage
				url={imgs[6]}
				color={data?.color || '#2B88F3'}
				variant='style-1'
			/>
			<p className='text-sm text-foreground mb-1'>{data?.name}</p>
			<p className='text-foreground/60 text-right w-full'>{data?.balance}</p>

			<Popover>
				<PopoverTrigger asChild>
					<Button variant={'ghost'} className='absolute top-3 right-3'>
						<IconDots className='!w-4 !h-4' />
					</Button>
				</PopoverTrigger>
				<PopoverContent
					align='end'
					className='p-1 w-fit rounded-md flex flex-col'
				>
					<WalletForm data={data}>
						<Button
							variant={'ghost'}
							className='bg-white rounded flex justify-start'
							size={'sm'}
						>
							<IconPencil />
							<p>Edit</p>
						</Button>
					</WalletForm>
					<AlertDialog>
						<AlertDialogTrigger asChild>
							<Button
								variant={'ghost'}
								className='rounded text-red-500 hover:text-red-600 flex justify-start'
								size={'sm'}
							>
								<IconTrashFilled />
								<p>Delete</p>
							</Button>
						</AlertDialogTrigger>
						<AlertDialogContent>
							<AlertDialogHeader>
								<AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
								<AlertDialogDescription>
									This action cannot be undone. This will permanently delete "
									{data?.name}" and remove related data like transaction and
									budget.
								</AlertDialogDescription>
							</AlertDialogHeader>
							<AlertDialogFooter>
								<AlertDialogCancel>Cancel</AlertDialogCancel>
								<AlertDialogAction
									className='bg-red-500 hover:bg-red-600'
									onClick={() =>
										data?.id &&
										destroy({
											id: data?.id,
										})
									}
								>
									Continue
								</AlertDialogAction>
							</AlertDialogFooter>
						</AlertDialogContent>
					</AlertDialog>
				</PopoverContent>
			</Popover>
		</div>
	)
}
