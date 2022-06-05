import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';

export const GetUserIp = createParamDecorator(
	(_data: any, ctx: ExecutionContext) => {
		const request = GqlExecutionContext
			.create(ctx)
			.getContext()
			.req;

		const remoteIp = request.connection?.remoteAddress;
		const forwardedIp = request.headers['x-forwarded-for'];

		return remoteIp || forwardedIp;
	}
);