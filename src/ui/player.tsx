'use client';

import { useEffect } from 'react';

import Button from '@/components/button';
import type { Player } from '@/services/player';

export default function PlayerView({ player }: { player?: Player }) {
	useEffect(() => {
		if (player) {
			document.getElementById('navigation')?.scrollIntoView({ behavior: 'smooth' });
		}
	}, [player]);

	return (
		<div className="flex-1 flex flex-col items-center gap-5 pb-5">
			{player === undefined ? (
				<div className="text-red-500">An error has occurred</div>
			) : player === null ? (
				<div className="">Oyuncu bulunamadı.</div>
			) : (
				<>
					<div className="flex flex-col items-center gap-3">
						<span className="text-center text-5xl font-bold">{player.byond_key}</span>
						<span>İlk Görülen Round: {player.first_seen_round}</span>
						<span>Son Görülen Round: {player.last_seen_round}</span>
						<span>İlk Görülen Tarih: {player.first_seen}</span>
						<span>Son Görülen Tarih: {player.last_seen}</span>
						<span>BYOND&apos;a Katıldığı Tarih: {player.byond_age}</span>
					</div>
					<div className="flex flex-col items-center gap-5">
						<div className="flex flex-col items-center gap-3">
							<span className="text-center text-3xl font-bold">Aktivite</span>
							<div className="flex flex-wrap gap-4 justify-center px-8 py-6 sm:px-20 md:px-24 xl:px-60">
								{/* Graph */}
								Yakında!
							</div>
						</div>
						<div className="flex flex-col items-center gap-3">
							<span className="text-center text-3xl font-bold">Roller</span>
							<div className="flex flex-wrap gap-4 justify-center px-8 py-6 sm:px-20 md:px-24 xl:px-60">
								{/* Graph */}
								Yakında!
							</div>
						</div>
						<div className="flex flex-col items-center gap-3">
							<span className="text-center text-3xl font-bold">Karakterler</span>
							<div className="flex flex-wrap gap-4 justify-center px-8 py-6 sm:px-20 md:px-24 xl:px-60">
								{player.characters.length ? player.characters.map((character) => (
									<Button key={character}>{character}</Button>
								)) : (
									<span>Hiçbir karakter bulunamadı.</span>
								)}
							</div>
						</div>
					</div>
				</>
			)}
		</div>
	);
}
