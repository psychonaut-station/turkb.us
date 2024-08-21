// @ts-expect-error lazy
const fetcher = (...args) => fetch(...args).then(async (res) => {
	if (!res.ok) {
		if (res.status === 404) {
			return null as any;
		}

		throw new Error(await res.text());
	}

	return await res.json();
});

export default fetcher;
