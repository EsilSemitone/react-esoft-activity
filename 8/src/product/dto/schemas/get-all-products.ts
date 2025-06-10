import { z } from 'zod';
import { ProductSchema } from './product';
import { PRODUCT_CATEGORY } from '../../../common/enums/product-category';

export const GetAllProductsRequestQuerySchema = z.object({
    category: z.nativeEnum(PRODUCT_CATEGORY).optional(),
    limit: z.coerce.number().positive(),
    offset: z.coerce.number(),
});

export const GetAllProductsResponseSchema = z.object({
    products: ProductSchema.array(),
    page: z.number(),
    totalPage: z.number(),
});
