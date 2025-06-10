import { z } from 'zod';

export const ConfigDataSchema = z.object({
    PORT: z.coerce.number().positive(),
    API_PREFIX: z.string().min(1),
    DB_PATH: z.string().min(1),
});
