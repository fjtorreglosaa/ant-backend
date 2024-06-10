import { LocationEntity } from '../entities/location.entity';
import { IBaseRepository } from './base.repository';

export interface ILocationRepository extends IBaseRepository<LocationEntity> { }