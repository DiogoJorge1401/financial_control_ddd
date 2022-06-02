import { SignUpDTO } from '@app/user/use-cases/signup/signup.dto';
import { Injectable } from '@nestjs/common';
import { Result } from 'types-ddd';

@Injectable()
export class UserService {
	async signup (dto: SignUpDTO): Promise<Result<boolean>> {
		console.log(dto);
		return Result.ok<boolean>(true);
	}
}