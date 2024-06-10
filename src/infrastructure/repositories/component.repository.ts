import { PrismaClient } from '@prisma/client';
import { BaseRepository } from './base.repository';
import { ComponentEntity, IComponentRepository } from '../../domain';

export class ComponentRepository extends BaseRepository<ComponentEntity> implements IComponentRepository {

    constructor( prisma: PrismaClient ) {
        super( prisma );
    }

    get model() {
        return this.prisma.component;
    }
}