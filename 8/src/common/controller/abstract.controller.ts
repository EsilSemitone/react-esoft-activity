import 'reflect-metadata';
import { Response, Router } from 'express';
import { injectable } from 'inversify';

@injectable()
export abstract class Controller {
    router: Router;
    constructor() {
        this.router = Router();
    }

    send<T extends string | object>(res: Response, status: number, message: T): Response {
        res.status(status);
        return res.send(message);
    }

    ok<T extends string | object>(res: Response, message: T): Response {
        return this.send(res, 200, message);
    }

    created<T extends string | object>(res: Response, message: T): Response {
        return this.send(res, 201, message);
    }
}
