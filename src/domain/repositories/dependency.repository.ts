import { DependencyEntity } from '../entities/dependency.entity';
import { IBaseRepository } from './base.repository';

export interface IDependencyRepository extends IBaseRepository<DependencyEntity> 
{ 
    getChildDependencies( dependencyId: string ): Promise<DependencyEntity[] | null>;
}