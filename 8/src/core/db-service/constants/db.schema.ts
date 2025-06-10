import { z } from 'zod';
import { PRODUCT_CATEGORY } from '../../../common/enums/product-category';
import { ProductSchema } from '../../../product/dto/schemas/product';

export const DatabaseSchema = z.object({
    products: ProductSchema.extend({
        created_at: z.coerce.date(),
    }).array(),
});
