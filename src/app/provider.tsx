'use client'

import {
	QueryClient,
	QueryClientConfig,
	QueryClientProvider,
} from '@tanstack/react-query'
import { useState } from 'react'

const option: QueryClientConfig = {
	defaultOptions: {
		queries: {
			staleTime: 10 * 60 * 1000,
			retry: 1,
		},
	},
}

export default function Provider({ children }: React.PropsWithChildren) {
	const [queryClient] = useState(() => new QueryClient(option))

	return (
		<QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
	)
}
