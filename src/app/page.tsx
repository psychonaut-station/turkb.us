import { getServer } from '@/services/server';
import { ServerList } from '@/ui/server-list';

export default async function Home() {
	const server = await getServer();

	return (
		<div className="flex-1 w-full flex flex-col items-center p-8 pb-20 sm:p-20 gap-5 lg:px-60">
			<ServerList fallback={server} />
		</div>
	);
}
