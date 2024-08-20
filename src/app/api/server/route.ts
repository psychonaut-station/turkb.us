import { getServer } from '@/services/server';

export async function GET() {
	return Response.json(await getServer());
}
