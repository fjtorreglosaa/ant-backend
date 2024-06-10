import { PrismaClient } from '@prisma/client';
import { BaseRepository } from './base.repository';
import { ComponentChangeEntity, IComponentChangeRepository } from '../../domain';

export class ComponentChangeRepository extends BaseRepository<ComponentChangeEntity> implements IComponentChangeRepository {

    constructor( prisma: PrismaClient ) {
        super( prisma );
    }

    get model() {
        return this.prisma.componentChange;
    }
}