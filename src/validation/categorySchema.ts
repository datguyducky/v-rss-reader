import { z } from 'zod';

export const categorySchema = z.object({
	name: z.string().min(1, { message: 'Name is required' }),
});
