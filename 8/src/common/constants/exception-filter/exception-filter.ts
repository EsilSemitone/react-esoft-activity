import 'reflect-metadata';
import { NextFunction, Request, Response } from 'express';
import { LoggerService } from '../../../core/logger-service/logger-service';
import { HttpException } from './http-exception';
import { inject, injectable } from 'inversify';
import { APP_TYPES } from '../../../app-types';

@injectable()
export class ExceptionFilter {
    constructor(@inject(APP_TYPES.LOGGER_SERVICE) private logger: LoggerService) {}

    execute(err: Error, req: Request, res: Response, next: NextFunction) {
        if (err instanceof HttpException) {
            this.logger.error(`[${err.context || ''}] ${err.path || req.path} ${err.message}  ${err.code}`);
            res.status(err.code);
            res.send({
                error: err.message,
                code: err.code,
                path: err.path && req.path,
            });
        } else {
            this.logger.error(`${err.message}`);
            res.status(500);
            res.send({ error: 'internal server error', code: 500, path: req.path });
        }
        this.logger.error(`[${err.stack}`);
    }
}
