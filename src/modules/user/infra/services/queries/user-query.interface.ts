import { IUser } from '@shared/interfaces/user-model-interface';

export interface IUserQueryService {
   getUserById(ui: string): Promise<IUser | null>
}