'use client'

import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from '@/components/ui/card'
import Link from 'next/link'
import { zodResolver } from '@hookform/resolvers/zod'

import { z } from 'zod'
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { useForm } from 'react-hook-form'
import { authClient } from '@/lib/auth-client'
import { toast } from 'sonner'
import { useState } from 'react'
import ButtonSubmit from '@/components/common/button-submit'

export default function SignIn() {
	const [isPending, setIsPending] = useState(false)

	const form = useForm<any>({
		defaultValues: {
			email: '',
			password: '',
		},
	})

	async function onSubmit(values: any) {
		const { email, password } = values
		const { data, error } = await authClient.signIn.email(
			{
				email,
				password,
				callbackURL: '/',
			},
			{
				onRequest: () => {
					setIsPending(true)
				},
				onSuccess: () => {
					form.reset()
				},
				onError: (ctx) => {
					alert(ctx.error.message)
				},
			}
		)
	}

	return (
		<Card className='w-full max-w-md mx-auto'>
			<CardHeader>
				<CardTitle>Sign In</CardTitle>
				<CardDescription>
					Welcome back! Please sign in to continue.
				</CardDescription>
			</CardHeader>

			<CardContent>
				<Form {...form}>
					<form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
						<FormField
							control={form.control}
							name='email'
							render={({ field }) => (
								<FormItem>
									<FormLabel>Email</FormLabel>
									<FormControl>
										<Input placeholder='john@mail.com' {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name='password'
							render={({ field }) => (
								<FormItem>
									<FormLabel>Password</FormLabel>
									<FormControl>
										<Input
											type='password'
											placeholder='Enter your password'
											{...field}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<ButtonSubmit isPending={isPending} />
					</form>
				</Form>
			</CardContent>

			<CardFooter className='flex justify-center'>
				<p className='text-sm text-muted-foreground'>
					Don&apos;t have an account yet?{' '}
					<Link href='/sign-up' className='text-primary hover:underline'>
						Sign up
					</Link>
				</p>
			</CardFooter>
		</Card>
	)
}
