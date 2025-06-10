import 'reflect-metadata';
import { Request, Response } from 'express';
import { Controller } from '../common/controller/abstract.controller';
import { inject, injectable } from 'inversify';
import { APP_TYPES } from '../app-types';
import { ProductService } from './product.service';
import { ValidateMiddleware } from '../common/middlewares/validate.middleware';
import { CreateProductRequestSchema } from './dto/schemas/create-product';
import { CreateProductRequestDto } from './dto/create-product.dto';
import { GetProductByIdRequestParamsDto } from './dto/get-product-by-id.dto';
import { GetProductByIdRequestParamsSchema } from './dto/schemas/get-product-by-id';
import { DeleteProductRequestParamsSchema } from './dto/schemas/delete-product';
import { DeleteProductRequestParamsDto } from './dto/delete-product.dto';
import { UpdateProductRequestParamsSchema, UpdateProductRequestSchema } from './dto/schemas/update-product';
import { UpdateProductRequestDto, UpdateProductRequestParamsDto } from './dto/update-product.dto';
import { GetAllProductsRequestQuerySchema } from './dto/schemas/get-all-products';
import { GetAllProductsRequestQueryDto } from './dto/get-all-products.dto';

@injectable()
export class ProductController extends Controller {
    constructor(@inject(APP_TYPES.PRODUCT_SERVICE) private productService: ProductService) {
        super();
        this.router.post(
            '/',
            ...[ValidateMiddleware([{ key: 'body', schema: CreateProductRequestSchema }])],
            this.createProduct.bind(this),
        );
        this.router.get(
            '/all',
            ValidateMiddleware([{ key: 'query', schema: GetAllProductsRequestQuerySchema }]),
            this.getAll.bind(this),
        );
        this.router.get(
            '/:productId',
            ...[ValidateMiddleware([{ key: 'params', schema: GetProductByIdRequestParamsSchema }])],
            this.getProductById.bind(this),
        );
        this.router.delete(
            '/:productId',
            ...[ValidateMiddleware([{ key: 'params', schema: DeleteProductRequestParamsSchema }])],
            this.delete.bind(this),
        );
        this.router.patch(
            '/:productId',
            ...[
                ValidateMiddleware([
                    { key: 'params', schema: UpdateProductRequestParamsSchema },
                    { key: 'body', schema: UpdateProductRequestSchema },
                ]),
            ],
            this.update.bind(this),
        );
    }
    async getAll({ query }: Request<object, object, object, GetAllProductsRequestQueryDto, object>, res: Response) {
        const result = await this.productService.getAll(query);
        this.ok(res, result);
    }

    async update(
        { body, params }: Request<UpdateProductRequestParamsDto, object, UpdateProductRequestDto>,
        res: Response,
    ) {
        const result = await this.productService.update(params.productId, body);
        this.ok(res, result);
    }

    async createProduct({ body }: Request<object, object, CreateProductRequestDto>, res: Response) {
        const result = await this.productService.create(body);
        this.ok(res, result);
    }

    async getProductById({ params }: Request<GetProductByIdRequestParamsDto>, res: Response) {
        const result = await this.productService.getById(params.productId);
        this.ok(res, result);
    }

    async delete({ params }: Request<DeleteProductRequestParamsDto>, res: Response) {
        const result = await this.productService.delete(params.productId);
        this.created(res, result);
    }
}
