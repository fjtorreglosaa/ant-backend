import { ManufacturerEntity } from '../entities/manufacturer.entity';
import { IBaseRepository } from './base.repository';

export interface IManufacturerRepository extends IBaseRepository<ManufacturerEntity> { }