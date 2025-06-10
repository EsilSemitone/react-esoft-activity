import { TypeOf } from 'zod';
import { ConfigDataSchema } from '../constants/config-data.schema';

export type ConfigData = TypeOf<typeof ConfigDataSchema>;
