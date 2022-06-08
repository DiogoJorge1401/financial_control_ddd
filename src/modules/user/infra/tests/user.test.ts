import { AppModule } from '@/app.module';
import { Mutation, MutationSigninArgs, MutationSignupArgs, Query } from '@/types/code-gen.types';
import { APP_PORT, TESTING_HOST } from '@config/env';
import { MongoDbConfig, MongoURI } from '@config/mongo.config';
import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { GraphQLClient } from 'graphql-request';
import mongoose, { Connection } from 'mongoose';
import { UserSchema } from '@user/infra/entities';
import { SIGNIN_MUTATION, SIGNUP_MUTATION } from './user.mutation';
import { AUTH_QUERY } from './user.query';

describe('user module', () => {
	let app: INestApplication;
	let client: GraphQLClient;
	let conn: Connection;

	beforeAll(async () => {
		const module: TestingModule = await Test.createTestingModule({
			imports: [AppModule]
		}).compile();

		app = module.createNestApplication();

		await app.listen(APP_PORT);

		client = new GraphQLClient(TESTING_HOST, {
			credentials: 'include'
		});

		conn = mongoose.createConnection(MongoURI, MongoDbConfig);
		const model = conn.model('User', UserSchema);

		await model.deleteMany({});

	});

	afterAll(async () => {
		await app.close();
		await conn.close();
	});

	it('should successfully signup', async () => {
		const data: MutationSignupArgs = {
			SignUpInput: {
				acceptedTerms: true,
				email: "valid_email@domain.com",
				password: "valid_pass123"
			}
		};

		type RequestReturn = Pick<Mutation, 'signup'>;

		const payload = await client.request<RequestReturn, MutationSignupArgs>(SIGNUP_MUTATION, data);

		expect(payload.signup).toBeTruthy();

	});

	it('should successfully signin', async () => {

		type RequestType = Pick<Mutation, 'signin'>;

		const variables: MutationSigninArgs = {
			SignInInput: {
				email: "valid_email@domain.com",
				password: "valid_pass123"
			}
		};

		const payload = await client
			.request<RequestType, MutationSigninArgs>(SIGNIN_MUTATION, variables);

		expect(payload.signin.token).toBeDefined();
		client.setHeaders({ authorization: `Bearer ${payload.signin.token}` });
	});

	it('should query user for authentication token successfully', async () => {
		type RequestType = Pick<Query, 'whoAmI'>;

		const payload = await client.request<RequestType>(AUTH_QUERY);

		expect(payload.whoAmI).toBeDefined();
		expect(payload.whoAmI).toHaveProperty('id');
		expect(payload.whoAmI).toHaveProperty('email');
		expect(payload.whoAmI).toHaveProperty('terms');
		expect(payload.whoAmI.terms[0]).toHaveProperty('ip');
	});
});
