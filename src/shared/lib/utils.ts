import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

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
