import { z } from 'zod';
import { ProductSchema } from './product';

export const GetProductByIdRequestParamsSchema = z.object({
    productId: z.string().uuid(),
});

export const GetProductByIdResponseSchema = ProductSchema;
