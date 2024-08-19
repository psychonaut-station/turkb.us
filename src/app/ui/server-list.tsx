'use client'

import useSWR from 'swr';

import fetcher from '@/app/utils/fetcher';

type ServerStatus = {
	connection_info: string;
	gamestate: number;
	map: string;
	name: string;
	players: number;
	round_duration: number;
	round_id: number;
	security_level: string;
	server_status: number;
}

export function ServerList({ fallback }: { fallback: ServerStatus[] }) {
	const { error, data: servers } = useSWR<ServerStatus[]>('/api/server', fetcher, {
		refreshInterval: 30_000,
		fallbackData: fallback,
	});

	if (error) return 'An error has occurred: ' + error.message;

	return (
		servers!.map((status) => <Server key={status.connection_info} status={status} />)
	)
}

function Server({ status }: { status: ServerStatus }) {
  return (
    <div className="w-full flex flex-col p-4 bg-white shadow-slate-200 shadow-glow rounded-xl text-sm font-light text-gray-500 [&>span>span]:text-black">
      <div className="flex justify-between uppercase">
        <span className="text-xl font-extrabold">{status.name}</span>
        <span className="bg-lime-400 rounded-xl text-white self-center px-2 leading-7">{status.server_status ? 'aktif' : 'kapalı'}</span>
      </div>
      <span>Map: <span>{status.map}</span></span>
      <span>Oyuncu sayısı: <span>{status.players}</span></span>
      <span>Round ID: <span>{status.round_id}</span></span>
      <span>Round durumu: <span>{friendlyGamestate(status.gamestate)}</span></span>
      <span>Round süresi: <span>{friendlyRoundDuration(status.round_duration)}</span></span>
			<a className="bg-green-400 hover:bg-green-500 rounded-xl text-white w-min px-2 py-1 mt-2 transition-colors" href={`byond://${status.connection_info}`}>Bağlan</a>
    </div>
  )
}

function friendlyGamestate(gamestate: number) {
	switch (gamestate) {
		case 0:
			return "Lobi";
		case 1:
			return "Lobi";
		case 2:
			return "Başlıyor";
		case 3:
			return "Devam ediyor";
		case 4:
			return "Bitti";
		default:
			return "";
	}
}

function friendlyRoundDuration(seconds: number) {
	const minutes = Math.floor(seconds / 60);
	const hours = Math.floor(minutes / 60);

	const pad = (n: number) => n.toString().padStart(2, '0');

	return `${pad(hours)}:${pad(minutes % 60)}:${pad(seconds % 60)}`;
}
