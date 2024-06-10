import { PrismaClient } from '@prisma/client';
import { BaseRepository } from './base.repository';
import { ISubjectParameterRepository, SubjectParameterEntity } from '../../domain';

export class SubjectParameterRepository extends BaseRepository<SubjectParameterEntity> implements ISubjectParameterRepository {

    constructor( prisma: PrismaClient ) {
        super( prisma );
    }

    get model() {
        return this.prisma.subjectParamenter;
    }
}