import { z } from 'zod';
import { ProductSchema } from './product';

export const UpdateProductRequestParamsSchema = z.object({
    productId: z.string().uuid(),
});

export const UpdateProductRequestSchema = ProductSchema.pick({
    name: true,
    price: true,
    stock: true,
    category: true,
})
    .extend({ stock: z.number().positive() })
    .partial();

export const UpdateProductResponseSchema = ProductSchema;
