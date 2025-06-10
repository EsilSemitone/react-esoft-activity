import 'reflect-metadata';
import { configDotenv } from 'dotenv';
import { ConfigData } from './interfaces/config-data';
import { ConfigDataSchema } from './constants/config-data.schema';
import { LoggerService } from '../logger-service/logger-service';
import { inject, injectable } from 'inversify';
import { APP_TYPES } from '../../app-types';

@injectable()
export class ConfigService {
    private data: ConfigData;

    constructor(@inject(APP_TYPES.LOGGER_SERVICE) private loggerService: LoggerService) {
        const parseEnv = configDotenv();

        if (parseEnv.error) {
            this.loggerService.error(parseEnv.error.message);
            throw new Error(parseEnv.error.message);
        }

        const parseResult = ConfigDataSchema.safeParse(parseEnv.parsed);
        if (parseResult.error) {
            this.loggerService.error(parseResult.error.message);
            throw new Error(parseResult.error.message);
        }

        this.data = parseResult.data;
    }

    get<T extends keyof ConfigData>(key: T): ConfigData[T] {
        return this.data[key];
    }
}
