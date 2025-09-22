export default function Layout({
	children,
	transaction,
}: {
	children: React.ReactNode
	transaction: React.ReactNode
}) {
	return (
		<div className='flex gap-4'>
			<div className="flex-1">{children}</div>
			<div className="flex-1">{transaction}</div>
		</div>
	)
}
