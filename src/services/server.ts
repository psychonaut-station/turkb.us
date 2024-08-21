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
	try {
		const server = await fetch(SERVER_ENDPOINT);

		if (!server.ok) {
			throw new Error('Internal API Error');
		}

		return await server.json();
	} catch {
		throw new Error('Internal Server Error');
	}
}
