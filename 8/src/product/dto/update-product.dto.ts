import { TypeOf } from 'zod';
import {
    UpdateProductRequestParamsSchema,
    UpdateProductRequestSchema,
    UpdateProductResponseSchema,
} from './schemas/update-product';

export type UpdateProductRequestParamsDto = TypeOf<typeof UpdateProductRequestParamsSchema>;
export type UpdateProductRequestDto = TypeOf<typeof UpdateProductRequestSchema>;
export type UpdateProductResponseDto = TypeOf<typeof UpdateProductResponseSchema>;
