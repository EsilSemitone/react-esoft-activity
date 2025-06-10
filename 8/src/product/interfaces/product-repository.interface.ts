import { ProductModel } from "../../common/models/product-model";
import { ICreateProduct } from "./create-product.interface";
import { IGetProductsByCriteria } from "./get-products-by-criteria.interface";
import { IUpdateProduct } from "./update-product.interface";

export interface IProductRepository {
    create(createData: ICreateProduct): Promise<ProductModel>;
    getById(uuid: string): Promise<ProductModel | null>;
    delete(uuid: string): Promise<void>;
    update(uuid: string, updateData: IUpdateProduct): Promise<ProductModel>;
    getByCriteria({
        limit,
        offset,
        category,
    }: IGetProductsByCriteria): Promise<{ count: number; products: ProductModel[] }>;
}
