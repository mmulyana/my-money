import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'
import Cookies from 'js-cookie'

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs))
}

export function debounce<F extends (...args: any[]) => void>(
	func: F,
	wait: number
) {
	let timeout: ReturnType<typeof setTimeout>
	return (...args: Parameters<F>) => {
		clearTimeout(timeout)
		timeout = setTimeout(() => func(...args), wait)
	}
}

export const redirectToLogin = () => {
	Cookies.remove('access_token')
	window.location.href = '/login'
}