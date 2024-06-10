import { PrismaClient } from '@prisma/client';
import { BaseRepository } from './base.repository';
import { ISubjectTypeRepository, SubjectTypeEntity } from '../../domain';

export class SubjectTypeRepository extends BaseRepository<SubjectTypeEntity> implements ISubjectTypeRepository {

    constructor( prisma: PrismaClient ) {
        super( prisma );
    }

    get model() {
        return this.prisma.subjectType;
    }
}