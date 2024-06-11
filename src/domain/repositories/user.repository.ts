import { UserEntity } from '../entities/user.entity';
import { IBaseRepository } from './base.repository';

export interface IUserRepository extends IBaseRepository<UserEntity> 
{ 
    getUserByEmail( email: string ) : Promise<UserEntity | null>;
}