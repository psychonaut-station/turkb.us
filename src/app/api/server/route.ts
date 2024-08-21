import { getServer } from '@/services/server';

export const revalidate = 180; // 30 seconds

export async function GET() {
	try {
		const server = await getServer();

		return Response.json(server);
	} catch (e: any) {
		return new Response(e.message, { status: 500 });
	}
}
