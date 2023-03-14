import { useState } from 'react';
import { Feed, parse } from 'react-native-rss-parser';

type RssFetchResult = {
	loading: boolean;
	error?: string;
	data?: Feed;
};
export const useRssFetch = (): [
	(url: string) => Promise<{ data?: Feed; error?: string }>,
	RssFetchResult,
] => {
	const [rssFetchResult, setRssFetchResult] = useState<RssFetchResult>({
		loading: false,
		error: undefined,
		data: undefined,
	});

	const fetchRss = async (url: string): Promise<{ data?: Feed; error?: string }> => {
		setRssFetchResult(prevResults => ({ ...prevResults, isLoading: true }));

		try {
			const response = await fetch(url);
			const responseText = await response.text();

			// TODO: Add sorting results based on user settings.
			if (response.ok) {
				const parsedRss = await parse(responseText);

				setRssFetchResult(prevResults => ({
					...prevResults,
					isLoading: false,
					data: parsedRss,
				}));

				return { ...rssFetchResult, data: parsedRss };
			} else {
				setRssFetchResult(prevResults => ({
					...prevResults,
					isLoading: false,
					error: responseText,
				}));

				return { data: undefined, error: responseText };
			}
		} catch (err) {
			setRssFetchResult(prevResults => ({
				...prevResults,
				isLoading: false,
				error: err.toString(),
			}));
		}

		return { data: undefined, error: undefined };
	};

	return [fetchRss, { ...rssFetchResult }];
};
