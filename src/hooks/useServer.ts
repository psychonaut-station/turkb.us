import useSWR from 'swr';

import type { ServerStatus } from '@/services/server';
import fetcher from '@/utils/fetcher';

export default function useServer(initial: ServerStatus[]):
	| { servers: ServerStatus[]; isLoading: true; error: undefined }
	| { servers: ServerStatus[]; isLoading: false; error: Error | undefined }
export default function useServer(initial?: ServerStatus[]):
	| { servers: undefined; isLoading: true; error: undefined }
	| { servers: ServerStatus[]; isLoading: false; error: undefined }
	| { servers: undefined; isLoading: false; error: Error };

export default function useServer(initial?: ServerStatus[]) {
	const { data, error, isLoading } = useSWR('/api/server', fetcher, {
		refreshInterval: 30_000,
		refreshWhenHidden: true,
		revalidateOnFocus: false,
		fallbackData: initial,
	});

	return {
		servers: data,
		isLoading,
		error,
	};
}
