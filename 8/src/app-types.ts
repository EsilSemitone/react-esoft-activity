import { ProductController } from './product/product.controller';

export const APP_TYPES = {
    APP: Symbol('APP'),
    CONFIG_SERVICE: Symbol('CONFIG_SERVICE'),
    EXCEPTION_FILTER: Symbol('EXCEPTION_FILTER'),
    LOGGER_SERVICE: Symbol('LOGGER_SERVICE'),
    DB_SERVICE: Symbol('DB_SERVICE'),

    PRODUCT_CONTROLLER: Symbol('PRODUCT_CONTROLLER'),
    PRODUCT_SERVICE: Symbol('PRODUCT_SERVICE'),
    PRODUCT_REPOSITORY: Symbol('PRODUCT_REPOSITORY'),
};
