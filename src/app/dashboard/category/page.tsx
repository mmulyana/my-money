import { Button } from '@/shared/components/ui/button'
import { Tabs, TabsList, TabsTrigger } from '@/shared/components/ui/tabs'
import {
	IconArrowDownRight,
	IconArrowUpRight,
	IconCategoryFilled,
	IconCategoryPlus,
	IconChevronLeft,
	IconChevronRight,
} from '@tabler/icons-react'

export default function Page() {
	// note: nanti aku tambahin state untuk cari tahu active di parent mana jika active nanti pake border bukan border-b, trus cari index dikurang 1 jika ada kecuali index 0 maka index sebelumnya border dihapus
	return (
		<div className='flex gap-4 flex-col md:flex-row'>
			<div className='flex-1'>
				<div className='flex justify-between items-center mb-4'>
					<div className='flex gap-3 items-center'>
						<IconCategoryFilled className='text-muted-foreground/50' />
						<p className='text-[15px] text-foreground'>Categories</p>
					</div>

					<Tabs defaultValue='expense'>
						<TabsList className='rounded-md h-fit border mx-auto'>
							<TabsTrigger
								value='expense'
								className='text-base md:text-sm h-6 rounded data-[state=active]:bg-white group'
							>
								<IconArrowDownRight className='group-data-[state=active]:text-red-500' />
								Expense
							</TabsTrigger>
							<TabsTrigger
								value='income'
								className='text-base md:text-sm h-6 rounded data-[state=active]:bg-white group'
							>
								<IconArrowUpRight className='group-data-[state=active]:text-teal-600' />
								Income
							</TabsTrigger>
						</TabsList>
					</Tabs>
				</div>

				<div className='bg-white rounded-md overflow-hidden group mb-4'>
					<button className='px-4 py-2.5 flex justify-between items-center w-full border-b border-border hover:bg-white group-hover:bg-muted-foreground/10 hover:!opacity-100 transition cursor-pointer'>
						<div className='flex gap-2 items-center'>
							<div className='w-1.5 h-1.5 rounded-full bg-blue-500'></div>
							<p className='text-foreground'>Eat & Drink</p>
						</div>
						<div className='flex justify-end gap-2 items-center'>
							<p className='text-sm text-muted-foreground w-fit pl-4'>
								2 children
							</p>
							<IconChevronRight size={18} />
						</div>
					</button>

					<button className='px-4 py-2.5 flex justify-between items-center w-full border-primary hover:bg-white group-hover:bg-muted-foreground/10 hover:!opacity-100 transition cursor-pointer border-2 border-b-2'>
						<div className='flex gap-2 items-center'>
							<div className='w-1.5 h-1.5 rounded-full bg-teal-500'></div>
							<p className='text-foreground'>Entertainment</p>
						</div>
						<div className='flex justify-end gap-2 items-center'>
							<IconChevronRight size={18} />
						</div>
					</button>

					<button className='px-4 py-2.5 flex justify-between items-center w-full border-b border-border hover:bg-white group-hover:bg-muted-foreground/10 hover:!opacity-100 transition cursor-pointer'>
						<div className='flex gap-2 items-center'>
							<div className='w-1.5 h-1.5 rounded-full bg-cyan-500'></div>
							<p className='text-foreground'>Electricity</p>
						</div>
						<div className='flex justify-end gap-2 items-center'>
							<IconChevronRight size={18} />
						</div>
					</button>

					<button className='px-4 py-2.5 flex justify-between items-center w-full hover:bg-white group-hover:bg-muted-foreground/10 hover:!opacity-100 transition cursor-pointer'>
						<div className='flex gap-2 items-center'>
							<div className='w-1.5 h-1.5 rounded-full bg-amber-500'></div>
							<p className='text-foreground'>Health</p>
						</div>
						<div className='flex justify-end gap-2 items-center'>
							<IconChevronRight size={18} />
						</div>
					</button>
				</div>

				<Button
					className='w-full hover:bg-muted-foreground/10'
					variant={'secondary'}
				>
					<IconCategoryPlus />
					Add Category
				</Button>
			</div>

			<div className='flex-1'>
				<div className='flex justify-between items-center mb-4'>
					<Button
						className='h-8 w-8 hover:bg-muted-foreground/10'
						variant={'secondary'}
					>
						<IconChevronLeft size={18} />
					</Button>
					<p className='text-foreground text-sm'>Eat & Drink</p>
					<Button
						className='h-8 w-8 hover:bg-muted-foreground/10'
						variant={'secondary'}
					>
						<IconChevronRight size={18} />
					</Button>
				</div>

				<div className='bg-white rounded-md overflow-hidden group mb-4'>
					<button className='px-4 py-2.5 flex justify-between items-center w-full border-b border-border hover:bg-white group-hover:bg-muted-foreground/10 hover:!opacity-100 transition cursor-pointer'>
						<p className='text-foreground'>Food</p>
					</button>

					<button className='px-4 py-2.5 flex justify-between items-center w-full border-b border-border hover:bg-white group-hover:bg-muted-foreground/10 hover:!opacity-100 transition cursor-pointer'>
						<p className='text-foreground'>Water</p>
					</button>

					<button className='px-4 py-2.5 flex justify-between items-center w-full hover:bg-white group-hover:bg-muted-foreground/10 hover:!opacity-100 transition cursor-pointer'>
						<p className='text-foreground'>Snack</p>
					</button>
				</div>

				<Button
					className='w-full hover:bg-muted-foreground/10'
					variant={'secondary'}
				>
					<IconCategoryPlus />
					Add Children
				</Button>
			</div>
		</div>
	)
}
