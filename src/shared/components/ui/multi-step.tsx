import React, { createContext, useContext, useState, ReactNode } from 'react'
import { Button } from './button'

type MultiStepContextType = {
	step: number
	next: () => void
	prev: () => void
	goTo: (step: number) => void
	totalSteps: number
}

type MultiStepProps = {
	children: ReactNode
	totalSteps: number
}

const MultiStepContext = createContext<MultiStepContextType | undefined>(
	undefined
)

export function MultiStep({ children, totalSteps }: MultiStepProps) {
	const [step, setStep] = useState(0)

	function next() {
		setStep((s) => Math.min(s + 1, totalSteps - 1))
	}

	function prev() {
		setStep((s) => Math.max(s - 1, 0))
	}

	function goTo(newStep: number) {
		if (newStep >= 0 && newStep < totalSteps) {
			setStep(newStep)
		}
	}

	return (
		<MultiStepContext.Provider value={{ step, next, prev, goTo, totalSteps }}>
			{children}
		</MultiStepContext.Provider>
	)
}

function useMultiStep() {
	const context = useContext(MultiStepContext)
	if (!context) throw new Error('useMultiStep must be used within MultiStep')
	return context
}

// Progress Indicator
export function MultiStepProgress({ right }: { right?: React.ReactNode }) {
	const { step, totalSteps } = useMultiStep()
	return (
		<div className='flex gap-2 items-center shrink-0 justify-between'>
			<p className='font-medium text-foreground w-8'>
				{step + 1}
				<span className='opacity-50'>/{totalSteps}</span>
			</p>
			<MultiStepProgressBar step={step} totalSteps={totalSteps} />
			{right}
		</div>
	)
}

export function MultiStepProgressBar({
	step,
	totalSteps,
}: {
	step: number
	totalSteps: number
}) {
	const progress = ((step + 1) / totalSteps) * 100

	return (
		<div className='w-1/2 h-2 bg-foreground/10 rounded-full overflow-hidden'>
			<div
				className='h-full bg-primary transition-all duration-300 rounded-full'
				style={{ width: `${progress}%` }}
			/>
		</div>
	)
}

export function MultiStepContent({
	children,
	stepIndex,
	className,
}: {
	children: ReactNode
	stepIndex: number
	className?: string
}) {
	const { step } = useMultiStep()
	if (step !== stepIndex) return null
	return <div className={className}>{children}</div>
}

export function MultiStepNext({
	children,
	disabled,
	placeholder,
}: {
	children?: ReactNode
	disabled?: boolean
	placeholder?: string
}) {
	const { next, step, totalSteps } = useMultiStep()
	return (
		<Button onClick={next} disabled={step === totalSteps - 1 || disabled}>
			{children ?? placeholder}
		</Button>
	)
}

export function MultiStepPrev({
	children,
	className,
}: {
	children?: ReactNode
	className?: string
}) {
	const { prev, step } = useMultiStep()
	return (
		<Button onClick={prev} disabled={step === 0} className={className}>
			{children ?? 'Previous'}
		</Button>
	)
}
