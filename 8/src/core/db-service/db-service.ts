import { inject, injectable } from 'inversify';
import 'reflect-metadata';
import { IDatabase } from './interfaces/db.interface';
import { APP_TYPES } from '../../app-types';
import { ConfigService } from '../config-service/config.service';
import { readFile, writeFile } from 'fs/promises';
import { DatabaseSchema } from './constants/db.schema';
import { INITIAL_DB } from './constants/initial-db';
import { existsSync } from 'fs';

@injectable()
export class DatabaseService {
    dbPath: string;
    db!: IDatabase;
    constructor(@inject(APP_TYPES.CONFIG_SERVICE) private configService: ConfigService) {
        this.dbPath = this.configService.get('DB_PATH');
        this.provideDb();
    }

    async provideDb(): Promise<void> {
        if (!existsSync(this.dbPath)) {
            console.log('Файла нет');
            this.db = INITIAL_DB;
            await writeFile(this.dbPath, JSON.stringify(this.db), 'utf-8');
        }
        const file = await readFile(this.dbPath, { encoding: 'utf-8' });
        const parsedFile = JSON.parse(file);

        const res = DatabaseSchema.safeParse(parsedFile);

        if (res.error) {
            console.log(res.error.message);
            this.db = INITIAL_DB;
            return;
        }

        this.db = res.data;
    }

    async save(): Promise<void> {
        await writeFile(this.dbPath, JSON.stringify(this.db), { encoding: 'utf-8', flag: 'w' });
    }
}
