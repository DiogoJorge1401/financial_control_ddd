import { IUser } from '@shared/interfaces';

export interface IUserQueryService {
   getUserById(ui: string): Promise<IUser | null>
}