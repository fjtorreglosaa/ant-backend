import { PrismaClient } from '@prisma/client';
import { BaseRepository } from './base.repository';
import { ISubjectRepository, SubjectEntity } from '../../domain';

export class SubjectRepository extends BaseRepository<SubjectEntity> implements ISubjectRepository {

    constructor( prisma: PrismaClient ) {
        super( prisma );
    }

    get model() {
        return this.prisma.subject;
    }
}