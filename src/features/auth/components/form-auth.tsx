'use client'

import { IconLock, IconLogin2, IconMail, IconUser } from '@tabler/icons-react'
import { useForm } from 'react-hook-form'
import Link from 'next/link'

import { Button } from '@/shared/components/ui/button'
import { Input } from '@/shared/components/ui/input'
import {
	Form,
	FormItem,
	FormField,
	FormLabel,
} from '@/shared/components/ui/form'

import { useRegister } from '../api/use-register'
import { useLogin } from '../api/use-login'
import { AuthForm } from '../types'
import { useRouter } from 'next/navigation'
import { useOauth } from '../api/use-oauth'

export default function FormAuth({
	variant,
}: {
	variant: 'login' | 'register'
}) {
	const router = useRouter()

	const { onGoogleOauth } = useOauth()
	const { mutate: register } = useRegister()
	const { mutate: login } = useLogin()

	const form = useForm<AuthForm>({
		defaultValues: {
			email: '',
			password: '',
			username: '',
		},
	})

	const handleSuccess = () => router.push('/app')

	const submit = (data: AuthForm) => {
		if (variant == 'login') {
			login(
				{ password: data.password, username: data.username },
				{
					onSuccess: handleSuccess,
					onError: (err) => {
						console.log(err)
					},
				}
			)
			return
		}

		register(data, {
			onSuccess: handleSuccess,
			onError: (err) => {
				console.log(err)
			},
		})
	}

	return (
		<Form {...form}>
			<form
				onSubmit={form.handleSubmit(submit)}
				className='flex flex-col gap-4'
			>
				<div className='space-y-4'>
					<Button
						type='button'
						variant={'outline'}
						className='shadow-none w-full hover:bg-muted-foreground/10'
						onClick={async () => {
							const url = await onGoogleOauth()
							router.push(url)
						}}
					>
						Log in with Google
					</Button>
					<Button
						type='button'
						variant={'outline'}
						className='shadow-none w-full hover:bg-muted-foreground/10'
					>
						Log in as Guest
					</Button>

					<div className='w-full h-8 relative'>
						<hr className='w-full h-[1px] border-gray-300 absolute top-1/2' />
						<div className='px-3 py-1 bg-background absolute left-1/2 text-xs font-medium top-1/2 -translate-x-1/2 -translate-y-1/2'>
							<p>OR</p>
						</div>
					</div>
				</div>
				<FormField
					control={form.control}
					name='username'
					render={({ field }) => (
						<FormItem>
							<FormLabel>
								{variant === 'login' ? 'Email or Username' : 'Username'}
							</FormLabel>
							<div className='relative'>
								<IconUser className='-translate-y-1/2 w-5 h-5 absolute left-2 top-1/2' />
								<Input {...field} className='pl-8 w-full' />
							</div>
						</FormItem>
					)}
				/>
				{variant === 'register' && (
					<FormField
						control={form.control}
						name='email'
						render={({ field }) => (
							<FormItem>
								<FormLabel>Email</FormLabel>
								<div className='relative'>
									<IconMail className='-translate-y-1/2 w-5 h-5 absolute left-2 top-1/2' />
									<Input {...field} className='pl-8 w-full' />
								</div>
							</FormItem>
						)}
					/>
				)}
				<FormField
					control={form.control}
					name='password'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Password</FormLabel>
							<div className='relative'>
								<IconLock className='-translate-y-1/2 w-5 h-5 absolute left-2 top-1/2' />
								<Input {...field} className='pl-8 w-full' />
							</div>
						</FormItem>
					)}
				/>
				<div className='pt-4'>
					<Button className='w-full'>
						{variant === 'register' ? 'Register' : 'Login'} <IconLogin2 />
					</Button>
					{variant === 'register' ? (
						<p className='pt-2 text-center'>
							Already have an account? <Link href={'/login'}>Login</Link>
						</p>
					) : (
						<p className='pt-2 text-center'>
							Dont have an account? <Link href={'/register'}>Register</Link>
						</p>
					)}
				</div>
			</form>
		</Form>
	)
}
