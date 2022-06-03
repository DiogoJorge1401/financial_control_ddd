import { MongooseModuleOptions } from '@nestjs/mongoose';

export const MongoDbConfig: MongooseModuleOptions = {
	useNewUrlParser: true,
	useUnifiedTopology: true,
	dbName: 'financial-control'
};

export const MongoURI = 'mongodb://root:mongo@localhost:27017';