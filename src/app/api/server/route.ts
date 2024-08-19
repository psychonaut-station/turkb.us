export async function GET() {
	const data = await fetch('https://api.turkb.us/v2/server', {
		next: { revalidate: 30 },
	}).then((res) => res.json());

	return Response.json(data);
}
