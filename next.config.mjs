/** @type {import('next').NextConfig} */
const nextConfig = {
	async redirects() {
		return [
			{
				source: '/discord',
				destination: process.env.DISCORD_URL,
				permanent: true
			},
			{
				source: '/patreon',
				destination: process.env.PATREON_URL,
				permanent: true
			},
			{
				source: '/wiki',
				destination: process.env.WIKI_URL,
				permanent: true
			},
		]
	}
};

export default nextConfig;
