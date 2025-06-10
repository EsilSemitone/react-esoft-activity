import { PRODUCT_CATEGORY } from '../../common/enums/product-category';

export interface ICreateProduct {
    name: string;
    price: number;
    stock: number;
    category: PRODUCT_CATEGORY;
}
