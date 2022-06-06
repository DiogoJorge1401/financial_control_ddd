import { DEFAULT_SECRET } from './env-token';

export const JWT_SECRET_KEY = process.env['JWT_SECRET_KEY'] || DEFAULT_SECRET;

export const DB_NAME = process.env['DB_NAME'] || 'financial-control';

export const MONGO_PASSORD = process.env['MONGO_PASSORD'] || 'mongo';

export const MONGO_USER = process.env['MONGO_USER'] || 'root';

export const MONGO_HOST = process.env['MONGO_HOST'] || '127.0.0.1';

export const MONGO_PORT = process.env['MONGO_PORT'] || 27017;

export const APP_PORT = process.env['APP_PORT'] || 3000;

type ICurrency = 'BRL'|'USD'|'EUR'|'JPY';

export const CURRENCY = process.env['CURRENCY'] as ICurrency || 'BRL';

export const TESTING_HOST = process.env['TESTING_HOST'] || 'http://localhost:3000/graphql';