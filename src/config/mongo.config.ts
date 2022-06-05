import { MongooseModuleOptions } from '@nestjs/mongoose';
import {
	DB_NAME,
	MONGO_HOST,
	MONGO_PASSORD,
	MONGO_PORT,
	MONGO_USER
} from './env';

export const MongoDbConfig: MongooseModuleOptions = {
	useNewUrlParser: true,
	useUnifiedTopology: true,
	dbName: DB_NAME
};

export const MongoURI = `mongodb://${MONGO_USER}:${MONGO_PASSORD}@${MONGO_HOST}:${MONGO_PORT}`;