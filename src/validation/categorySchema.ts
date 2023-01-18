import { z } from 'zod';

export const categorySchema = z.object({
	NAME: z.string().min(1, { message: 'Name is required' }),
});
