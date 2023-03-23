import { useState } from 'react';
import { Feed, parse } from 'react-native-rss-parser';

type RssFetchResult = {
	loading: boolean;
	error?: string;
	data?: Feed[];
};
export const useRssFetch = (): [
	(url: string) => Promise<{ data?: Feed[]; error?: string }>,
	RssFetchResult,
] => {
	const [rssFetchResult, setRssFetchResult] = useState<RssFetchResult>({
		loading: false,
		error: undefined,
		data: undefined,
	});

	const fetchRss = async (url: string | string[]): Promise<{ data?: Feed[]; error?: string }> => {
		setRssFetchResult(prevResults => ({ ...prevResults, isLoading: true }));

		try {
			if (Array.isArray(url)) {
				const data: Feed[] = [];
				for (const u of url) {
					const response = await fetch(u);
					const responseText = await response.text();

					if (response.ok) {
						const parsedRss = await parse(responseText);
						data.push(parsedRss);
					} else {
						setRssFetchResult(prevResults => ({
							...prevResults,
							isLoading: false,
							error: responseText,
						}));

						return { data: undefined, error: responseText };
					}
				}

				setRssFetchResult(prevResults => ({
					...prevResults,
					isLoading: false,
					data,
				}));

				return { data };
			} else {
				const response = await fetch(url);
				const responseText = await response.text();

				if (response.ok) {
					const parsedRss = await parse(responseText);

					setRssFetchResult(prevResults => ({
						...prevResults,
						isLoading: false,
						data: [parsedRss],
					}));

					return { data: [parsedRss] };
				} else {
					setRssFetchResult(prevResults => ({
						...prevResults,
						isLoading: false,
						error: responseText,
					}));

					return { data: undefined, error: responseText };
				}
			}
		} catch (err: unknown) {
			const error = (err as Error).toString();

			setRssFetchResult(prevResults => ({
				...prevResults,
				isLoading: false,
				error,
			}));
		}

		return { data: undefined, error: undefined };
	};

	return [fetchRss, { ...rssFetchResult }];
};
