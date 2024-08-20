'use client';

import { faSearch, faSpinner } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon as Icon } from '@fortawesome/react-fontawesome';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import useSWRImmutable from 'swr/immutable';

import fetcher from '@/utils/fetcher';

export default function Player() {
	const inputRef = useRef<HTMLInputElement>(null);

	const [input, setInput] = useState('');
	const [lazyAutocomplete, setLazyAutocomplete] = useState<string[]>([]);

	const { data: autocomplete, isLoading } = useSWRImmutable<string[]>('/api/autocomplete/ckey?ckey=' + input, fetcher, {
		isPaused: () => inputRef.current ? inputRef.current.value.length === 0 : true,
	});

	useEffect(() => {
		if (input.length === 0) {
			setLazyAutocomplete([]);
		} else if (autocomplete) {
			setLazyAutocomplete(autocomplete);
		}
	}, [input, autocomplete])

	useEffect(() => {
		const currentInput = inputRef.current;

		let timeout = 0;

		const onInput = () => {
			if (timeout !== 0) {
				clearTimeout(timeout);
			}

			// @ts-expect-error ts confuses with NodeJS.Timeout
			timeout = setTimeout(() => {
				setInput(currentInput?.value ?? '');
			}, 500);
		};

		currentInput?.addEventListener('input', onInput);

		return () => {
			currentInput?.removeEventListener('input', onInput);
		}
	}, [inputRef]);

	return (
		<div className="flex-1 w-full flex flex-col items-center justify-start font-sans">
			<div className="bg-white bg-opacity-5 border border-white border-opacity-10 px-3 py-2 rounded-[.25rem] text-center flex items-center">
				<input ref={inputRef} className="flex-1 h-full bg-transparent outline-none" placeholder="Oyuncu ara"></input>
				<div className="w-5"><Icon icon={isLoading ? faSpinner : faSearch} spin={isLoading} className={`text-white align-middle ${isLoading && 'opacity-50'}`} /></div>
			</div>
			<div className="flex flex-wrap gap-4 justify-center px-8 py-6 sm:px-20">
				{lazyAutocomplete.map((ckey) => (
					<Link key={ckey} href={`/players/${ckey}`} prefetch={false}>
						<div className="bg-white bg-opacity-5 hover:bg-opacity-10 transition-colors border border-white border-opacity-10 px-3 py-2 rounded-[.25rem]">
							{ckey}
						</div>
					</Link>
				))}
			</div>
		</div>
	);
}
