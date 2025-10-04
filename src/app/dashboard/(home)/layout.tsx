export default function Layout({ children }: { children: React.ReactNode }) {
	return (
		<div className='flex gap-4 flex-col md:flex-row'>
			<div className='flex-1'>{children}</div>
		</div>
	)
}
