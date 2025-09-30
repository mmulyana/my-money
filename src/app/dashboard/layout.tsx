import { Sidebar } from '@/shared/components/common/sidebar'

export default function Layout({ children }: React.PropsWithChildren) {
	return (
		<div className='flex'>
			<div className='hidden md:flex w-[240px]'>
				<Sidebar />
			</div>
			<div className='py-4 pl-4 md:pl-0 pr-4 flex-1 min-w-0'>{children}</div>
		</div>
	)
}
