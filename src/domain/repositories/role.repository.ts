import { RoleEntity } from '../entities/role.entity';
import { IBaseRepository } from './base.repository';

export interface IRoleRepository extends IBaseRepository<RoleEntity> { }