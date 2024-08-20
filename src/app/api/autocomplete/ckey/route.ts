const ENDPOINT = process.env.API_URL + '/autocomplete/ckey?ckey=';

export async function GET(request: Request) {
	const url = new URL(request.url);
	const ckey = url.searchParams.get('ckey');

	if (!ckey) {
		return Response.json([]);
	}

	const response = await fetch(ENDPOINT + ckey, {
		next: { revalidate: 3_600 },
		headers: {
			'X-API-KEY': process.env.API_KEY!,
		},
	}).then((res) => res.json());

	return Response.json(response);
}
