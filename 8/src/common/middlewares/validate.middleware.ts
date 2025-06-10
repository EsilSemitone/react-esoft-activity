import { Request, Response, NextFunction, RequestHandler } from 'express';
import { ZodIssue } from 'zod';
import { HttpException } from '../constants/exception-filter/http-exception.js';
import { ValidateMiddlewareInput } from './types/validate.middleware-input.js';

export function ValidateMiddleware(input: ValidateMiddlewareInput): RequestHandler<any, any, any, any, any> {
    return (req: Request, res: Response, next: NextFunction) => {
        const errors: ZodIssue[] = [];

        for (const { key, schema } of input) {
            const { error, data: parseResult } = schema.safeParse(req[key]);
            if (error) {
                for (const e of error.errors) {
                    errors.push(e);
                }
            } else {
                if (key != 'params') {
                    Object.defineProperty(req, key, {
                        value: parseResult,
                        writable: false,
                        configurable: true,
                        enumerable: true,
                    });
                }
            }
        }

        if (errors.length > 0) {
            return next(
                new HttpException(
                    errors
                        .map((er) => `path: ${er.path}, error: ${er.code}, description: ${er.message}`)
                        .join(` ::|:: `),
                    400,
                    req.path,
                ),
            );
        }

        return next();
    };
}
