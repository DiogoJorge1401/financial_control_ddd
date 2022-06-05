import { BadRequestException, InternalServerErrorException } from '@nestjs/common';
import { Result } from 'types-ddd';

export const CheckResultInterceptor = <T, F>(result: Result<T, F>): Result<T, F> => {
	if (result.isFailure)
		switch (result.statusCode) {
		case 'BAD_REQUEST':
			throw new BadRequestException(result.errorValue());
		default:
			throw new InternalServerErrorException(result.errorValue());
		}

	return result;
};