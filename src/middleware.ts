import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

export const config = {
	matcher: '/players/:ckey*',
};

export function middleware(request: NextRequest) {
	if (request.nextUrl.pathname.startsWith('/players/')) {
		return handlePlayers(request);
	}
}

function handlePlayers(request: NextRequest) {
	const [, , ckey, ...rest] = request.nextUrl.pathname.split('/');

	if (ckey !== ckey.toLowerCase()) {
		const url = '/players/' + ckey.toLowerCase() + rest.map((v) => `/${v}`).join('');
		return NextResponse.redirect(new URL(url, request.nextUrl));
	}
}
