import { TypeOf } from 'zod';
import { DeleteProductRequestParamsSchema, DeleteProductResponseSchema } from './schemas/delete-product';

export type DeleteProductRequestParamsDto = TypeOf<typeof DeleteProductRequestParamsSchema>;
export type DeleteProductResponseDto = TypeOf<typeof DeleteProductResponseSchema>;
