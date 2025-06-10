import { Container, ContainerModule } from 'inversify';
import { App } from './app';
import { ExceptionFilter } from './common/constants/exception-filter/exception-filter';
import { ConfigService } from './core/config-service/config.service';
import { LoggerService } from './core/logger-service/logger-service';
import { ProductController } from './product/product.controller';
import { APP_TYPES } from './app-types';
import { ProductService } from './product/product.service';
import { DatabaseService } from './core/db-service/db-service';
import { ProductRepository } from './product/product.repository';
import { IProductService } from './product/interfaces/product.service.interface';
import { IProductRepository } from './product/interfaces/product-repository.interface';

const container = new Container();
const appModule = new ContainerModule(({ bind }) => {
    bind<ConfigService>(APP_TYPES.CONFIG_SERVICE).to(ConfigService).inSingletonScope();
    bind<LoggerService>(APP_TYPES.LOGGER_SERVICE).to(LoggerService);
    bind<ExceptionFilter>(APP_TYPES.EXCEPTION_FILTER).to(ExceptionFilter).inSingletonScope();
    bind<DatabaseService>(APP_TYPES.DB_SERVICE).to(DatabaseService).inSingletonScope();
});

const productModule = new ContainerModule(({ bind }) => {
    bind<ProductController>(APP_TYPES.PRODUCT_CONTROLLER).to(ProductController).inSingletonScope();
    bind<IProductService>(APP_TYPES.PRODUCT_SERVICE).to(ProductService).inSingletonScope();
    bind<IProductRepository>(APP_TYPES.PRODUCT_REPOSITORY).to(ProductRepository).inSingletonScope();
});
function buildContainer(): Container {
    container.load(appModule);
    container.load(productModule);
    container.bind<App>(APP_TYPES.APP).to(App).inSingletonScope();

    return container;
}
async function main(): Promise<{ app: App; container: Container }> {
    const container = buildContainer();
    const app = container.get<App>(APP_TYPES.APP);
    app.init();

    return { app, container };
}

export const app = main();
