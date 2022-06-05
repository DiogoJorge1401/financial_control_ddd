import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { UserAgentType } from '@user/infra/types';
import { UAParser } from 'ua-parser-js';

export const GetUserAgent = createParamDecorator(
	(_data: any, ctx: ExecutionContext): UserAgentType => {
		const context = GqlExecutionContext.create(ctx).getContext();
		const headers = context.req.headers;
		const uaParser = new UAParser();

		const userAgent = uaParser.setUA(headers['user-agent']).getResult();
		return {
			name: userAgent?.browser?.name ?? 'undefined',
			os: userAgent?.os?.name?.toUpperCase() as any ?? 'undefined',
			type: userAgent?.device?.type ?? 'browser',
			version: userAgent?.browser?.version?? '89.0'
		};
	},
);