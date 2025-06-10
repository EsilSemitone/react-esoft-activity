import { inject, injectable } from 'inversify';
import 'reflect-metadata';
import { APP_TYPES } from '../app-types';
import { DatabaseService } from '../core/db-service/db-service';
import { ICreateProduct } from './interfaces/create-product.interface';
import { ProductModel } from '../common/models/product-model';
import { randomUUID } from 'node:crypto';
import { IUpdateProduct } from './interfaces/update-product.interface';
import { IGetProductsByCriteria } from './interfaces/get-products-by-criteria.interface';
import { IProductRepository } from './interfaces/product-repository.interface';

@injectable()
export class ProductRepository implements IProductRepository {
    constructor(@inject(APP_TYPES.DB_SERVICE) private db: DatabaseService) {}

    async create(createData: ICreateProduct): Promise<ProductModel> {
        const newProduct: ProductModel = {
            ...createData,
            uuid: randomUUID(),
            created_at: new Date(),
        };

        this.db.db.products.push(newProduct);
        await this.db.save();
        return newProduct;
    }

    async getById(uuid: string): Promise<ProductModel | null> {
        const product = this.db.db.products.find((p) => p.uuid === uuid);
        return product || null;
    }

    async delete(uuid: string): Promise<void> {
        this.db.db.products = this.db.db.products.filter((p) => p.uuid !== uuid);
        await this.db.save();
    }

    async update(uuid: string, updateData: IUpdateProduct): Promise<ProductModel> {
        const product = this.db.db.products.find((p) => p.uuid === uuid);
        if (!product) {
            throw new Error('Продукт не найден');
        }

        Object.assign(product, updateData);
        await this.db.save();

        return product;
    }

    async getByCriteria({
        limit,
        offset,
        category,
    }: IGetProductsByCriteria): Promise<{ count: number; products: ProductModel[] }> {
        const filterProducts = () => {
            let products = [...this.db.db.products];
            if (category) {
                products = products.filter((p) => p.category === category);
            }

            return products;
        };

        const products = filterProducts();

        if (offset > products.length) {
            return { count: 0, products: [] };
        }

        const offsetProducts = products.slice(offset, offset + limit);
        return { count: products.length, products: offsetProducts };
    }
}
