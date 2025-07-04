import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatThousands(value: any): string {
  if (typeof value === 'number') {
    return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')
  } else {
    return '-'
  }
}
