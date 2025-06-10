import { TypeOf } from 'zod';
import { CreateProductRequestSchema, CreateProductResponseSchema } from './schemas/create-product';

export type CreateProductRequestDto = TypeOf<typeof CreateProductRequestSchema>;
export type CreateProductResponseDto = TypeOf<typeof CreateProductResponseSchema>;
