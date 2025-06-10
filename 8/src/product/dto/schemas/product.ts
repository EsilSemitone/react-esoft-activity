import { z } from 'zod';
import { PRODUCT_CATEGORY } from '../../../common/enums/product-category';

export const ProductSchema = z.object({
    uuid: z.string().uuid(),
    name: z.string(),
    price: z.number(),
    stock: z.number(),
    category: z.nativeEnum(PRODUCT_CATEGORY),
    created_at: z.date(),
});
