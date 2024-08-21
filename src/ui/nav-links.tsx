'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import Button from '@/components/button';

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
		<div className="flex flex-col items-center p-6 text-white">
			<div className="flex flex-col items-center">
				<Image src="/logo.png" alt="Psychonaut Station" width={128} height={128} priority />
				<span className="text-5xl text-center font-mono">Psychonaut Station</span>
			</div>
			<div id="navigation" className="flex items-center justify-center flex-wrap gap-4 pt-6 mt-[1px]">
				{NAVIGATION.map(({ href, label, prefetch, blank, like }) => (
					<Link key={href} href={href} prefetch={!(prefetch === false)} {...(blank && { target: '_blank', rel: 'noreferrer external' })}>
						<Button active={like ? pathname.startsWith(href) : pathname === href}>
							{label}
						</Button>
					</Link>
				))}
			</div>
		</div>
	);
}
