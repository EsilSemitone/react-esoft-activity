import { CreateProductRequestDto, CreateProductResponseDto } from '../dto/create-product.dto';
import { DeleteProductResponseDto } from '../dto/delete-product.dto';
import { GetAllProductsRequestQueryDto, GetAllProductsResponseDto } from '../dto/get-all-products.dto';
import { GetProductByIdResponseDto } from '../dto/get-product-by-id.dto';
import { UpdateProductRequestDto, UpdateProductResponseDto } from '../dto/update-product.dto';

export interface IProductService {
    create(dto: CreateProductRequestDto): Promise<CreateProductResponseDto>;
    getById(uuid: string): Promise<GetProductByIdResponseDto>;
    delete(uuid: string): Promise<DeleteProductResponseDto>;
    update(productId: string, updateData: UpdateProductRequestDto): Promise<UpdateProductResponseDto>;
    getAll(dto: GetAllProductsRequestQueryDto): Promise<GetAllProductsResponseDto>;
}
