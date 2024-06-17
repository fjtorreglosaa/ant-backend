import { UserDependencyEntity } from '../entities/user-dependency.entity';
import { IBaseRepository } from './base.repository';

export interface IUserDependencyRepository extends IBaseRepository<UserDependencyEntity>
{
    createUserDependencies( userDependencies: UserDependencyEntity[] ): Promise<Boolean>;
    findUserDependenciesByUserIds(ids: string[], page: number, limit: number): Promise<UserDependencyEntity[] | null>;
    findCountOfUserDependenciesByUserIds( ids: string[] ): Promise<number>;
}