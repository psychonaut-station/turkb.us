import useSWR from 'swr';

import type { ServerStatus } from '@/app//lib/definitions';
import fetcher from '@/app/lib/fetcher';

const url = process.env.NEXT_PUBLIC_API_URL + '/v2/server';

export default function useServer() {
	const { data, error, isLoading } = useSWR<ServerStatus[]>(url, fetcher, {
		refreshInterval: 30_000,
		refreshWhenHidden: true,
		revalidateOnFocus: false,
	});

	return {
		servers: data,
		error,
		isLoading,
	};
}
