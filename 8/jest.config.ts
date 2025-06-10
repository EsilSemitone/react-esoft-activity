import { Config } from '@jest/types';

const config: Config.InitialOptions = {
    verbose: true,
    preset: 'ts-jest',
    testMatch: ['**/*.test.ts', '**/*.spec.ts'],
};

export default config;
