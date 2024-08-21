import useSWRImmutable from 'swr/immutable';

import type { Player } from '@/services/player';
import fetcher from '@/utils/fetcher';

export default function usePlayer(ckey: string, initial: Player):
	| { player: Player; isLoading: true; error: undefined }
	| { player: Player; isLoading: false; error: Error | undefined }
export default function usePlayer(ckey: string, initial?: Player):
	| { player: Player; isLoading: false; error: undefined }
	| { player: undefined; isLoading: true; error: undefined }
	| { player: undefined; isLoading: false; error: Error };

export default function usePlayer(ckey: string, initial?: Player) {
	const { data, error, isLoading } = useSWRImmutable('/api/player?ckey=' + ckey, fetcher, {
		fallbackData: initial,
	});

	return {
		player: data,
		isLoading,
		error,
	};
}
