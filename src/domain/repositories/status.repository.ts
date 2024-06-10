import { StatusEntity } from '../entities/status.entity';
import { IBaseRepository } from './base.repository';

export interface IStatusRepository extends IBaseRepository<StatusEntity> 
{ 
    getStatusByName( name: string ): Promise<StatusEntity | null>;
}