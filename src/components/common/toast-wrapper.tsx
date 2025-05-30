import { Toaster } from '../ui/sonner'

export default function ToastWrapper({ children }: React.PropsWithChildren) {
	return (
		<>
			{children}
			<Toaster />
		</>
	)
}
