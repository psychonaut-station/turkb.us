import { getPlayer, type Player } from '@/services/player';
import PlayerView from '@/ui/player';

export default async function Ckey({ params }: { params: { ckey: string } }) {
	let player: Player | undefined;

	try {
		player = await getPlayer(params.ckey);
	} catch {}

	return (
		<PlayerView player={player} />
	);
}
