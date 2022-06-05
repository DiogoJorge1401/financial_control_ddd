import { ApolloDriver } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { MongooseModule } from '@nestjs/mongoose';
import { join } from 'path';
import { MongoDbConfig, MongoURI } from './config/mongo.config';
import { UserModule } from '@user/infra/user.module';

@Module({
	imports: [
		MongooseModule.forRoot(MongoURI, MongoDbConfig),
		GraphQLModule.forRoot({
			driver: ApolloDriver,
			autoSchemaFile: join(process.cwd(), 'src/types/schema.gql'),
		}),
		UserModule
	]
})
export class AppModule { }
