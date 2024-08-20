export type ServerStatus = {
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

const SERVER_ENDPOINT = process.env.API_URL + '/server';

export async function getServer(): Promise<ServerStatus[]> {
	const server = await fetch(SERVER_ENDPOINT, {
		next: { revalidate: 30 },
	}).then((res) => res.json());

	return server;
}
