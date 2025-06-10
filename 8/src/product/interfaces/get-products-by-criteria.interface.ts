import { PRODUCT_CATEGORY } from '../../common/enums/product-category';

export interface IGetProductsByCriteria {
    category?: PRODUCT_CATEGORY;
    limit: number;
    offset: number;
}
