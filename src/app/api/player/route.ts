import type { NextRequest } from "next/server";

import { getPlayer } from "@/services/player";

export const revalidate = 3_600; // 1 hour

export async function GET(request: NextRequest) {
	const ckey = request.nextUrl.searchParams.get('ckey');

	if (!ckey) {
		return new Response('Missing ckey param', { status: 400 });
	}

	try {
		const player = await getPlayer(ckey);

		if (!player) {
			return new Response('Player not found', { status: 404 });
		}

		return Response.json(player);
	} catch (e: any) {
		return new Response(e.message, { status: 500 });
	}
}
