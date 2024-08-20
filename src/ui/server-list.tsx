'use client'

import useServer, { Status } from '@/hooks/useServer';
import { useEffect, useRef } from 'react';

export function ServerList({ fallback }: { fallback: Status[] }) {
	const { error, servers } = useServer(fallback);

	return (
		<>
			{servers.map((status) => <Server key={status.connection_info} status={status} />)}
			{!!error && <div className="text-red-500">An error has occurred: {error.message}</div>}
		</>
	)
}

function Server({ status }: { status: Status }) {
	const roundDurationRef = useRef<HTMLSpanElement>(null);

	useEffect(() => {
		let roundDuration = status.round_duration;

		const interval = setInterval(() => {
			roundDuration += 1;
			if (roundDurationRef.current) {
				roundDurationRef.current.textContent = readableRoundDuration(roundDuration);
			}
		}, 1_000);

		return () => {
			clearInterval(interval);
		}
	}, [status.round_duration]);

  return (
    <div className="w-full flex flex-col p-4 bg-white shadow-slate-200 shadow-glow rounded-xl text-sm font-light text-gray-500 [&>span>span]:text-black">
      <div className="flex justify-between uppercase">
        <span className="text-xl font-extrabold">{status.name}</span>
        <span className="bg-lime-400 rounded-xl text-white self-center px-2 leading-7">{status.server_status ? 'aktif' : 'kapalı'}</span>
      </div>
      <span>Map: <span>{status.map}</span></span>
      <span>Oyuncu sayısı: <span>{status.players}</span></span>
      <span>Round ID: <span>{status.round_id}</span></span>
      <span>Round durumu: <span>{readableGamestate(status.gamestate)}</span></span>
      <span>Round süresi: <span ref={roundDurationRef}>{readableRoundDuration(status.round_duration)}</span></span>
			<a className="bg-green-400 hover:bg-green-500 rounded-xl text-white w-min px-2 py-1 mt-2 transition-colors" href={`byond://${status.connection_info}`}>Bağlan</a>
    </div>
  )
}

function readableGamestate(gamestate: number) {
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

function readableRoundDuration(seconds: number) {
	const minutes = Math.floor(seconds / 60);
	const hours = Math.floor(minutes / 60);

	const pad = (n: number) => n.toString().padStart(2, '0');

	return `${pad(hours)}:${pad(minutes % 60)}:${pad(seconds % 60)}`;
}
