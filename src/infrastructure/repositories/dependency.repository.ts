import { PrismaClient } from '@prisma/client';
import { BaseRepository } from './base.repository';
import { DependencyEntity, IDependencyRepository } from '../../domain';

export class DependencyRepository extends BaseRepository<DependencyEntity> implements IDependencyRepository {

    constructor( prisma: PrismaClient ) {
        super( prisma );
    }

    get model() {
        return this.prisma.dependency;
    }
}