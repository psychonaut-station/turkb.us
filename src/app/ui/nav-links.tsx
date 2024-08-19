'use client'

import { usePathname } from 'next/navigation'
import Image from "next/image";
import Link from 'next/link';

const LINKS = [
	{ href: '/', label: 'Sunucu Durumu' },
	{ href: '/discord', label: 'Discord' },
	{ href: '/patreon', label: 'Patreon' },
	{ href: '/wiki', label: 'Wiki' },
];

export function NavLinks() {
  const pathname = usePathname()

  return (
    <div className="flex flex-col items-center m-6 gap-6">
			<div className="flex flex-col items-center">
				<Image src="/logo.png" alt="Psychonaut Station" width={128} height={128} priority />
				<span className="text-5xl text-center">Psychonaut Station</span>
			</div>
			<div className="flex items-center justify-center flex-wrap gap-4 font-sans">
				{LINKS.map(({ href, label }) => (
					<Link key={href} href={href}>
						<div className={`${pathname === href ? 'bg-opacity-15 hover:bg-opacity-20' : 'bg-opacity-5 hover:bg-opacity-10'} bg-white border border-opacity-10 border-white px-3 py-2 rounded-[.25rem] transition-colors`}>
							{label}
						</div>
					</Link>
				))}
			</div>
		</div>
  )
}
