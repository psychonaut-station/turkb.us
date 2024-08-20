'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const NAVIGATION = [
	{ href: '/', label: 'Sunucu Durumu' },
	{ href: '/players', label: 'Oyuncular', like: true },
	{ href: '/discord', label: 'Discord', prefetch: false, blank: true },
	{ href: '/patreon', label: 'Patreon', prefetch: false, blank: true },
	{ href: '/wiki', label: 'Wiki', prefetch: false },
];

export function NavLinks() {
	const pathname = usePathname();

	return (
		<div className="flex flex-col items-center m-6 gap-6">
			<div className="flex flex-col items-center">
				<Image src="/logo.png" alt="Psychonaut Station" width={128} height={128} priority />
				<span className="text-5xl text-center">Psychonaut Station</span>
			</div>
			<div className="flex items-center justify-center flex-wrap gap-4 font-sans">
				{NAVIGATION.map(({ href, label, prefetch, blank, like }) => (
					<Link key={href} href={href} prefetch={!(prefetch === false)} {...(blank && { target: '_blank', rel: 'noreferrer external' })}>
						<div className={`${(like ? pathname.startsWith(href) : pathname === href) ? 'bg-opacity-15 hover:bg-opacity-20' : 'bg-opacity-5 hover:bg-opacity-10'} bg-white border border-opacity-10 border-white px-3 py-2 rounded-[.25rem] transition-colors`}>
							{label}
						</div>
					</Link>
				))}
			</div>
		</div>
	);
}
