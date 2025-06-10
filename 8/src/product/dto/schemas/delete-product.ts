import { z } from 'zod';

export const DeleteProductRequestParamsSchema = z.object({
    productId: z.string().uuid(),
});

export const DeleteProductResponseSchema = z.object({
    isSuccess: z.boolean(),
});
