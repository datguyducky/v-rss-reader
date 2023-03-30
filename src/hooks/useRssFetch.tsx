import { useState } from 'react';
import { Feed, parse } from 'react-native-rss-parser';
import uuid from 'react-native-uuid';

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

	const fetchRss = async (
		sources: string | Record<string, unknown>[],
	): Promise<{ data?: Feed[]; error?: string }> => {
		setRssFetchResult(prevResults => ({ ...prevResults, isLoading: true }));

		try {
			if (Array.isArray(sources)) {
				const data: Feed[] = [];

				for (const feed of sources) {
					const response = await fetch(feed.url as string);
					const responseText = await response.text();

					if (response.ok) {
						const parsedRss = await parse(responseText);

						data.push({
							...parsedRss,
							feedAppCategory: feed?.name || '',
							items: parsedRss.items.map(item => ({
								...item,
								id: `${item.id}_${uuid.v4()}${feed?.name ? '_' + feed.name : ''}`, // we are not only using the feed id, but we also generate one ourselves to make sure that there won't be any id duplicates anywhere in the app
							})),
						});
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
				const response = await fetch(sources);
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
