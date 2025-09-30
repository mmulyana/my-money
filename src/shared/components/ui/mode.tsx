import React, { createContext, useContext, useReducer, ReactNode } from 'react'

type ModeContextType = {
	activeKey: string | number | null
	setActive: (key: string | number | null) => void
	currentKey: string | number | null
}

const ModeContext = createContext<ModeContextType | undefined>(undefined)

function useMode() {
	const ctx = useContext(ModeContext)
	if (!ctx) throw new Error('useMode must be used within ModeProvider')
	return ctx
}

export function ModeProvider({
	children,
	defaultKey,
}: {
	children: ReactNode
	defaultKey: string | number
}) {
	const [activeKey, dispatch] = useReducer(
		(_: string | number | null, action: string | number | null) => action,
		defaultKey
	)

	const setActive = (key: string | number | null) => dispatch(key)

	return (
		<ModeContext.Provider
			value={{ activeKey, setActive, currentKey: activeKey }}
		>
			{children}
		</ModeContext.Provider>
	)
}

export function ModeItem({
	keyName,
	children,
}: {
	keyName: string | number
	children: (props: {
		isActive: boolean
		onActivate: (val: string | number) => void
	}) => ReactNode
}) {
	const { activeKey, setActive } = useMode()

	const isActive = activeKey === keyName
	const onActivate = (val: string | number) => setActive(val)

	if (!isActive) return null
	return <>{children({ isActive, onActivate })}</>
}
