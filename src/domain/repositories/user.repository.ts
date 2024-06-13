import { UserEntity } from '../entities/user.entity';
import { IBaseRepository } from './base.repository';

export interface IUserRepository extends IBaseRepository<UserEntity> 
{ 
    findUserByEmail( email: string ) : Promise<UserEntity | null>;
    findUsersByEmail(term: string, page: number, limit: number): Promise<UserEntity[] | null>;
    findUsersByProfileName(term: string, page: number, limit: number): Promise<UserEntity[] | null>;
    findUsersByIds(ids: string[], page: number, limit: number): Promise<UserEntity[] | null>;
    findAllUsers(page: number, limit: number): Promise<UserEntity[] | null>;
}