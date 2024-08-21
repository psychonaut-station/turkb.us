import headers from '@/utils/headers';

export type Player = {
	ckey: string;
	byond_key: string;
	first_seen: string;
	last_seen: string;
	first_seen_round: number;
	last_seen_round: number;
	byond_age: string;
	characters: string[];
} | null;

const PLAYER_ENDPOINT = process.env.API_URL + '/player?ckey=';
const CHARACTERS_ENDPOINT = process.env.API_URL + '/player/characters?ckey=';

export async function getPlayer(ckey: string): Promise<Player> {
	try {
		const [player, characters] = await Promise.all([fetch(PLAYER_ENDPOINT + ckey, { headers }), fetch(CHARACTERS_ENDPOINT + ckey, { headers })]);

		if (player.status === 404 || characters.status === 404) {
			return null;
		}

		if (!player.ok || !player.ok) {
			throw new Error('Internal API Error');
		}

		return Object.assign(await player.json(), { characters: await characters.json() });
	} catch {
		throw new Error('Internal Server Error');
	}
}
