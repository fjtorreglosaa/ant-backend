import { UserEntity } from '../entities/user.entity';
import { IBaseRepository } from './base.repository';

export interface IUserRepository extends IBaseRepository<UserEntity> 
{ 
    getUserByEmail( email: string ) : Promise<UserEntity | null>;
    findUsersByEmail(term: string, page: number, limit: number): Promise<UserEntity[]>;
    findUsersByProfileName(term: string, page: number, limit: number): Promise<UserEntity[]>;
    findUsersByIds(ids: string[], page: number, limit: number): Promise<UserEntity[]>;
}