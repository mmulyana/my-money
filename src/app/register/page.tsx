import FormAuth from '@/features/auth/components/form-auth'

export default function Page() {
	return (
		<div className='max-w-2xl mx-auto w-full p-4'>
			<FormAuth variant='register' />
		</div>
	)
}
