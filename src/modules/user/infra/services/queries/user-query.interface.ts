import { User} from '@user/infra/entities';
export interface IUserQueryService{
   getUserById(ui:string):Promise<User|null>
}