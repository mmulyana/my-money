'use client'

import { IconSelector, IconCheck as Check } from '@tabler/icons-react'
import { useState } from 'react'

import { Button } from '@/shared/components/ui/button'
import { cn } from '@/shared/lib/utils'
import {
	Command,
	CommandEmpty,
	CommandGroup,
	CommandInput,
	CommandItem,
	CommandList,
} from '@/shared/components/ui/command'
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from '@/shared/components/ui/popover'

type Option = {
	value: string
	label: string
}

interface ComboboxProps {
	options: Option[]
	value: string
	onValueChange: (value: string) => void
	onSearchChange?: (value: string) => void
	notFoundContent?: React.ReactNode
	placeholder?: string
	buttonClassName?: string
	trigger?: React.ReactNode
	align?: 'center' | 'end' | 'start'
	style?: {
		content?: string
	}
}

export function Combobox({
	options,
	value,
	onValueChange,
	onSearchChange,
	notFoundContent,
	placeholder = 'Select option...',
	buttonClassName,
	trigger,
	align = 'center',
	style,
}: ComboboxProps) {
	const [open, setOpen] = useState(false)
	const [search, setSearch] = useState('')

	const handleSearchChange = (val: string) => {
		setSearch(val)
		onSearchChange?.(val)
	}

	return (
		<Popover open={open} onOpenChange={setOpen}>
			<PopoverTrigger asChild>
				{trigger ?? (
					<Button
						variant='outline'
						role='combobox'
						aria-expanded={open}
						className={cn('w-[200px] justify-between', buttonClassName)}
					>
						{value
							? options.find((opt) => opt.value === value)?.label
							: placeholder}
						<IconSelector className='opacity-50' />
					</Button>
				)}
			</PopoverTrigger>
			<PopoverContent
				className={cn('w-[200px] p-0', style?.content)}
				align={align}
			>
				<Command>
					<CommandInput
						placeholder='Search...'
						className='h-9'
						value={search}
						onValueChange={handleSearchChange}
					/>
					<CommandList>
						<CommandEmpty>
							{notFoundContent ?? <p>No results found</p>}
						</CommandEmpty>
						<CommandGroup>
							{options.map((opt) => (
								<CommandItem
									key={opt.value}
									value={opt.value}
									onSelect={() => {
										onValueChange(opt.value === value ? '' : opt.value)
										setOpen(false)
									}}
								>
									{opt.label}
									<Check
										className={cn(
											'ml-auto',
											value === opt.value ? 'opacity-100' : 'opacity-0'
										)}
									/>
								</CommandItem>
							))}
						</CommandGroup>
					</CommandList>
				</Command>
			</PopoverContent>
		</Popover>
	)
}
