import { useState } from 'react';
import { parse } from 'react-native-rss-parser';
import uuid from 'react-native-uuid';

import { Feed } from './useFeedsCategories';
import { RssFeed } from '../@types';

type RssFetchResult = {
	loading: boolean;
	error?: string;
	data?: RssFeed[];
};
export const useRssFetch = (): [
	(url: string | Feed[]) => Promise<{ data?: RssFeed[]; error?: string }>,
	RssFetchResult,
] => {
	const [rssFetchResult, setRssFetchResult] = useState<RssFetchResult>({
		loading: false,
		error: undefined,
		data: undefined,
	});

	const fetchRss = async (
		sources: string | Feed[],
	): Promise<{ data?: RssFeed[]; error?: string }> => {
		setRssFetchResult(prevResults => ({ ...prevResults, loading: true }));

		setRssFetchResult(prevResults => ({
			...prevResults,
			loading: true,
		}));

		try {
			if (Array.isArray(sources)) {
				const data: RssFeed[] = [];

				for (const feed of sources) {
					try {
						const response = await fetch(feed.url as string);
						const responseText = await response.text();

						const parsedRss = await parse(responseText);

						data.push({
							...parsedRss,
							items: parsedRss.items.map(item => ({
								...item,
								feedAppCategory: feed?.name || '',
								id: `${item.id}_${uuid.v4()}${feed?.name ? '_' + feed.name : ''}`, // we are not only using the feed id, but we also generate one ourselves to make sure that there won't be any id duplicates anywhere in the app
							})),
						});
					} catch (e) {
						// Do nothing when it was not possible to fetch a feed.
						// TODO: Maybe I could add some sort of a notification to display how many, or which feeds couldn't be fetched
					}
				}

				setRssFetchResult(prevResults => ({
					...prevResults,
					loading: false,
					data,
				}));

				return { data };
			} else {
				const response = await fetch(sources);
				const responseText = await response.text();

				if (response.ok) {
					const parsedRss = await parse(responseText);

					setRssFetchResult(prevResults => ({
						...prevResults,
						loading: false,
						data: [parsedRss],
					}));

					return { data: [parsedRss] };
				} else {
					setRssFetchResult(prevResults => ({
						...prevResults,
						loading: false,
						error: responseText,
					}));

					return { data: undefined, error: responseText };
				}
			}
		} catch (err: unknown) {
			const error = (err as Error).toString();

			setRssFetchResult(prevResults => ({
				...prevResults,
				loading: false,
				error,
			}));
		}

		return { data: undefined, error: undefined };
	};

	return [fetchRss, { ...rssFetchResult }];
};
