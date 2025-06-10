import 'reflect-metadata';
import express, { Express } from 'express';
import { ExceptionFilter } from './common/constants/exception-filter/exception-filter';
import { ConfigService } from './core/config-service/config.service';
import { LoggerService } from './core/logger-service/logger-service';
import { InjectPrefix } from './common/helpers/inject-prefix';
import { ProductController } from './product/product.controller';
import { inject, injectable } from 'inversify';
import { APP_TYPES } from './app-types';

@injectable()
export class App {
    app: Express;
    port: number;
    prefix: string;
    injectPrefix: InjectPrefix;

    constructor(
        @inject(APP_TYPES.CONFIG_SERVICE) private configService: ConfigService,
        @inject(APP_TYPES.EXCEPTION_FILTER) private exceptionFilter: ExceptionFilter,
        @inject(APP_TYPES.LOGGER_SERVICE) private loggerService: LoggerService,
        @inject(APP_TYPES.PRODUCT_CONTROLLER) private productController: ProductController,
    ) {
        this.app = express();
        this.port = this.configService.get('PORT');
        this.prefix = this.configService.get('API_PREFIX');
        this.injectPrefix = new InjectPrefix(this.prefix);
    }

    private useMiddlewares() {
        this.app.use(express.json());
    }

    private useRoutes() {
        this.app.use(this.injectPrefix.inject('/product'), this.productController.router);
    }

    private useExceptionFilter() {
        this.app.use(this.exceptionFilter.execute.bind(this.exceptionFilter));
    }

    public init() {
        this.useMiddlewares();
        this.useRoutes();
        this.useExceptionFilter();
        this.app.listen(this.port, () => {
            this.loggerService.log(`Start server on http://localhost:${this.port}/${this.prefix}/`);
        });
    }
}
