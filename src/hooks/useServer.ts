import useSWR from 'swr';

import type { ServerStatus } from '@/services/server';
import fetcher from '@/utils/fetcher';

export default function useServer(initial: ServerStatus[]): {
	servers: ServerStatus[];
	isLoading: boolean;
	error: any;
};
export default function useServer():
	| { servers: ServerStatus[]; isLoading: false; error: undefined }
	| { servers: undefined; isLoading: true; error: undefined }
	| { servers: undefined; isLoading: false; error: any };

export default function useServer(initial?: ServerStatus[]) {
	const { data, error, isLoading } = useSWR<ServerStatus[]>(
		'/api/server',
		fetcher,
		{
			refreshInterval: 30_000,
			refreshWhenHidden: true,
			revalidateOnFocus: false,
			revalidateIfStale: false,
			fallbackData: initial,
		}
	);

	return {
		servers: data,
		isLoading,
		error,
	};
}
