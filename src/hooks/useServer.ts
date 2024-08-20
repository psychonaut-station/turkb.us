import useSWR from 'swr';

import fetcher from '@/utils/fetcher';

export type Status = {
	connection_info: string;
	gamestate: number;
	map: string;
	name: string;
	players: number;
	round_duration: number;
	round_id: number;
	security_level: string;
	server_status: number;
};

export default function useServer(initial: Status[]): {
	servers: Status[];
	isLoading: boolean;
	error: any;
};
export default function useServer():
	| { servers: Status[]; isLoading: false; error: undefined }
	| { servers: undefined; isLoading: true; error: undefined }
	| { servers: undefined; isLoading: false; error: any };

export default function useServer(initial?: Status[]) {
	const { data, error, isLoading } = useSWR<Status[]>('/api/server', fetcher, {
		refreshInterval: 30_000,
		refreshWhenHidden: true,
		revalidateOnFocus: false,
		revalidateIfStale: false,
		fallbackData: initial,
	});

	return {
		servers: data,
		isLoading,
		error,
	};
}
