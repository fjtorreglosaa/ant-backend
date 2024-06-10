import { ProfileEntity } from '../entities/profile.entity';
import { IBaseRepository } from './base.repository';

export interface IProfileRepository extends IBaseRepository<ProfileEntity> { }