import { z } from 'zod';
import { ProductSchema } from './product';

export const CreateProductRequestSchema = ProductSchema.pick({
    name: true,
    price: true,
    stock: true,
    category: true,
});

export const CreateProductResponseSchema = ProductSchema;
