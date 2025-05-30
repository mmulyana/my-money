import { auth } from '@/lib/auth'
import { headers } from 'next/headers'
import { Button } from '../ui/button'
import { redirect } from 'next/navigation'

export default async function SignOut() {
	const session = await auth.api.getSession({
		headers: await headers(),
	})

	if (!session) return null

	return (
		<form
			action={async () => {
				'use server'
				await auth.api.signOut({
					headers: await headers(),
				})
				redirect('/')
			}}
		>
			<Button variant='destructive' className='cursor-pointer'>Keluar</Button>
		</form>
	)
}
