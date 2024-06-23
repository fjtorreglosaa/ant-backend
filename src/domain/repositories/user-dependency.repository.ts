import { UserDependencyEntity } from '../entities/user-dependency.entity';
import { IBaseRepository } from './base.repository';

export interface IUserDependencyRepository extends IBaseRepository<UserDependencyEntity>
{
    createUserDependencies( userDependencies: UserDependencyEntity[] ): Promise<Boolean>;
    findUserDependenciesByUserIds(ids: string[], page: number, limit: number): Promise<{ total: number, data: UserDependencyEntity[] } | null>;
    findUserDependenciesByUserIdsNoPaginated( ids: string[] ): Promise<UserDependencyEntity[] | null>;
    findCountOfUserDependenciesByUserIds( ids: string[] ): Promise<number>;
    removeUserDependenciesByIds( dependencyIds: string[] ): Promise<boolean>;
}