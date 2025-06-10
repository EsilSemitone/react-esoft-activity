import { beforeAll, describe, expect, it, jest } from '@jest/globals';
import { Container } from 'inversify';
import { IProductService } from './interfaces/product.service.interface';
import { IProductRepository } from './interfaces/product-repository.interface';
import { ProductService } from './product.service';
import { APP_TYPES } from '../app-types';
import { PRODUCT_CATEGORY } from '../common/enums/product-category';
import { LoggerService } from '../core/logger-service/logger-service';

const PRODUCT = {
    name: 'product',
    price: 1,
    stock: 1,
    category: PRODUCT_CATEGORY.PLANT,
};

const productRepositoryMock: jest.Mocked<IProductRepository> = {
    create: jest.fn(),
    getById: jest.fn(),
    delete: jest.fn(),
    update: jest.fn(),
    getByCriteria: jest.fn(),
};

const container = new Container();

let productService: IProductService;

beforeAll(() => {
    container.bind<ProductService>(APP_TYPES.PRODUCT_SERVICE).to(ProductService);
    container.bind<IProductRepository>(APP_TYPES.PRODUCT_REPOSITORY).toConstantValue(productRepositoryMock);
    container.bind<LoggerService>(APP_TYPES.LOGGER_SERVICE).to(LoggerService);

    productService = container.get<ProductService>(APP_TYPES.PRODUCT_SERVICE);
});

describe('product service', () => {
    it('should create a product', async () => {
        const createdProduct = { ...PRODUCT, uuid: '123', created_at: new Date() };
        productRepositoryMock.create.mockResolvedValue(createdProduct);

        const res = await productService.create(PRODUCT);

        expect(productRepositoryMock.create).toHaveBeenCalledWith(PRODUCT);
        expect(res).toMatchObject(createdProduct);
    });

    it('should find a product', async () => {
        const finedProduct = { ...PRODUCT, uuid: '123', created_at: new Date() };
        productRepositoryMock.getById.mockResolvedValue(finedProduct);

        const res = await productService.getById('123');

        expect(productRepositoryMock.getById).toHaveBeenCalledWith('123');
        expect(res).toMatchObject(finedProduct);
    });

    it('should delete a product', async () => {
        productRepositoryMock.delete.mockResolvedValue(undefined);
        const res = await productService.delete('123');

        expect(productRepositoryMock.delete).toHaveBeenCalledWith('123');
        expect(res).toMatchObject({ isSuccess: true });
    });

    it('should trow error', async () => {
        productRepositoryMock.getById.mockResolvedValue(null);

        expect(
            productService.update('123', {
                name: 'product',
                price: 1,
                stock: 1,
                category: PRODUCT_CATEGORY.PLANT,
            }),
        ).rejects.toThrow();
    });

    it('should update a product', async () => {
        const updateData = { name: 'product2', price: 2, stock: 2, category: PRODUCT_CATEGORY.PLANT };
        const updatedProduct = { ...updateData, uuid: '123', created_at: new Date() };

        productRepositoryMock.getById.mockResolvedValue({ ...PRODUCT, uuid: '123', created_at: new Date() });
        productRepositoryMock.update.mockResolvedValue(updatedProduct);

        const res = await productService.update('123', updateData);

        expect(productRepositoryMock.update).toHaveBeenCalledWith('123', updateData);
        expect(res).toMatchObject(updatedProduct);
    });

    it('should get all a products', async () => {
        const products = [
            { ...PRODUCT, uuid: '1', created_at: new Date() },
            { ...PRODUCT, uuid: '2', created_at: new Date() },
            { ...PRODUCT, uuid: '3', created_at: new Date() },
        ];

        productRepositoryMock.getByCriteria.mockResolvedValue({ products, count: 3 });

        const query = { limit: 3, offset: 0, category: PRODUCT_CATEGORY.PLANT };

        const res = await productService.getAll(query);

        expect(productRepositoryMock.getByCriteria).toHaveBeenCalledWith(query);
        expect(res).toMatchObject({ page: 1, totalPage: 1, products });
    });
});
