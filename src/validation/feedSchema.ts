import { z } from 'zod';

export const feedSchema = z.object({
	name: z.string().min(1, { message: 'Name is required' }),
	url: z
		.string()
		.min(1, { message: 'Url is required' })
		.regex(/^(ht)tps?:\/\//, {
			message: 'Feed URL needs to start with "https://" or "http://',
		}),
	category: z.string().nullish(),
});
