import { TypeOf } from 'zod';
import { GetAllProductsRequestQuerySchema, GetAllProductsResponseSchema } from './schemas/get-all-products';

export type GetAllProductsRequestQueryDto = TypeOf<typeof GetAllProductsRequestQuerySchema>;
export type GetAllProductsResponseDto = TypeOf<typeof GetAllProductsResponseSchema>;
