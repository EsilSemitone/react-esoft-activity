import { inject, injectable } from 'inversify';
import 'reflect-metadata';
import { APP_TYPES } from '../app-types';
import { LoggerService } from '../core/logger-service/logger-service';
import { ProductRepository } from './product.repository';
import { CreateProductRequestDto, CreateProductResponseDto } from './dto/create-product.dto';
import { GetProductByIdResponseDto } from './dto/get-product-by-id.dto';
import { HttpException } from '../common/constants/exception-filter/http-exception';
import { ERRORS } from '../common/constants/error';
import { DeleteProductResponseDto } from './dto/delete-product.dto';
import {
    UpdateProductRequestDto,
    UpdateProductResponseDto,
} from './dto/update-product.dto';
import { GetAllProductsRequestQueryDto, GetAllProductsResponseDto } from './dto/get-all-products.dto';
import { IProductService } from './interfaces/product.service.interface';

@injectable()
export class ProductService implements IProductService {
    constructor(
        @inject(APP_TYPES.LOGGER_SERVICE) private loggerService: LoggerService,
        @inject(APP_TYPES.PRODUCT_REPOSITORY) private productRepository: ProductRepository,
    ) {
        this.loggerService.setServiceName(ProductService.name);
    }

    async create(dto: CreateProductRequestDto): Promise<CreateProductResponseDto> {
        this.loggerService.log(`Start service create with params: ${JSON.stringify(dto)}`);

        const res = await this.productRepository.create(dto);
        this.loggerService.log(`Success service create`);
        return res;
    }

    async getById(uuid: string): Promise<GetProductByIdResponseDto> {
        this.loggerService.log(`Start service getById with params: ${JSON.stringify(uuid)}`);

        const res = await this.productRepository.getById(uuid);

        if (!res) {
            throw new HttpException(ERRORS.PRODUCT_NOT_FOUND, 404);
        }
        this.loggerService.log(`Success service getById`);
        return res;
    }

    async delete(uuid: string): Promise<DeleteProductResponseDto> {
        this.loggerService.log(`Start service delete with params: ${JSON.stringify(uuid)}`);

        await this.productRepository.delete(uuid);
        this.loggerService.log(`Success service delete`);

        return {
            isSuccess: true,
        };
    }

    async update(productId: string, updateData: UpdateProductRequestDto): Promise<UpdateProductResponseDto> {
        this.loggerService.log(`Start service update with params: ${JSON.stringify({ productId, ...updateData })}`);

        const isProductExist = await this.productRepository.getById(productId);

        if (!isProductExist) {
            throw new HttpException(ERRORS.PRODUCT_NOT_FOUND, 404);
        }

        const result = await this.productRepository.update(productId, updateData);
        this.loggerService.log(`Success service update`);

        return result;
    }

    async getAll(dto: GetAllProductsRequestQueryDto): Promise<GetAllProductsResponseDto> {
        this.loggerService.log(`Start service getAll with params: ${JSON.stringify(dto)}`);

        const { count, products } = await this.productRepository.getByCriteria(dto);
        const page = Math.floor(dto.offset / dto.limit) + 1;
        const totalPage = Math.ceil(count / dto.limit);
        this.loggerService.log(`Success service getAll`);

        return {
            products,
            page,
            totalPage,
        };
    }
}
