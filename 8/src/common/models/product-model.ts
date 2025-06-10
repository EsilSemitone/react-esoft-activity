import { PRODUCT_CATEGORY } from '../enums/product-category';

export interface ProductModel {
    uuid: string;
    name: string;
    price: number;
    stock: number;
    category: PRODUCT_CATEGORY;
    created_at: Date;
}
