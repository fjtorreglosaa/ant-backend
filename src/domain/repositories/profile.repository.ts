import { ProfileEntity } from '../entities/profile.entity';
import { IBaseRepository } from './base.repository';

export interface IProfileRepository extends IBaseRepository<ProfileEntity> 
{ 
    findProfilesByName(term: string, page: number, limit: number): Promise<ProfileEntity[]>;
}