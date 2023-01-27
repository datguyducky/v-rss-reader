import { z } from 'zod';

export const feedSchema = z.object({
	NAME: z.string().min(1, { message: 'Name is required' }),
	URL: z
		.string()
		.min(1, { message: 'Url is required' })
		.regex(/^(ht)tps?:\/\//, {
			message: 'Feed URL needs to start with "https://" or "http://',
		}),
	CATEGORY: z.string().nullish(),
});
