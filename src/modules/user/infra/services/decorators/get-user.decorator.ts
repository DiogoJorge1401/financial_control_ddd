import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';

export const GetUserId =  createParamDecorator(
	(_data: any, ctx: ExecutionContext): string => {
		const request = GqlExecutionContext
			.create(ctx)
			.getContext()
			.req;

		const token = request?.user?.userID;

		return token;
	}
);