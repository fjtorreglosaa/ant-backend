import { IDependencyTypeRepository } from './../../domain/repositories/dependency-type.repository';
import { DependencyTypeEntity } from '../../domain';
import { PrismaClient } from '@prisma/client';
import { BaseRepository } from './base.repository';

export class DependencyTypeRepository extends BaseRepository<DependencyTypeEntity> implements IDependencyTypeRepository {
    
    constructor( prisma: PrismaClient ) {
        super( prisma );
    }

    get model() {
        return this.prisma.dependencyType;
    }
}