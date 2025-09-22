import { Sidebar } from '@/shared/components/common/sidebar'

export default function Layout({ children }: React.PropsWithChildren) {
	return (
		<div className='flex'>
			<div className='w-[240px]'>
				<Sidebar />
			</div>
			<div className='p-4 flex-1'>{children}</div>
		</div>
	)
}
