import { TypeOf } from 'zod';
import { GetProductByIdRequestParamsSchema, GetProductByIdResponseSchema } from './schemas/get-product-by-id';

export type GetProductByIdRequestParamsDto = TypeOf<typeof GetProductByIdRequestParamsSchema>;
export type GetProductByIdResponseDto = TypeOf<typeof GetProductByIdResponseSchema>;
