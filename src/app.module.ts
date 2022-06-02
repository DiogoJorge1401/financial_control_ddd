import { ApolloDriver } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { MongooseModule } from '@nestjs/mongoose';
import { join } from 'path';
import { UserModule } from './infra/user/user.module';

@Module({
	imports: [
		MongooseModule.forRoot('mongodb://root:mongo@localhost:27017'),
		GraphQLModule.forRoot({
			driver: ApolloDriver,
			autoSchemaFile: join(process.cwd(), 'src/types/schema.gql'),
		}),
		UserModule
	]
})
export class AppModule { }
