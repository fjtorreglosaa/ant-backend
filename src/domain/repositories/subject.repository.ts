import { SubjectEntity } from '../entities/subject.entity';
import { IBaseRepository } from './base.repository';

export interface ISubjectRepository extends IBaseRepository<SubjectEntity> { }