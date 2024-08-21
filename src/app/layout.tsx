import './globals.css';

import type { Metadata } from 'next';
import localFont from 'next/font/local';

import { NavLinks } from '@/ui/nav-links';

const geistSans = localFont({
	src: './fonts/GeistVF.woff',
	variable: '--font-geist-sans',
});
const geistMono = localFont({
	src: './fonts/GeistMonoVF.woff',
	variable: '--font-geist-mono',
});

export const metadata: Metadata = {
	title: 'Psychonaut Station',
	description: "Psychonaut Station'a hoş geldin.",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="tr">
			<body className={`${geistSans.variable} ${geistMono.variable}`}>
				<div className="w-screen h-screen flex flex-col font-sans overflow-x-hidden scrollbar-color scrollbar-thumb-gray scrollbar-track-transparent">
					<NavLinks />
					{children}
				</div>
				<div className="w-screen h-screen top-0 left-0 fixed bg-[url('/wallpaper.png')] bg-cover -z-50 pointer-events-none"></div>
			</body>
		</html>
	);
}
