import { PrismaClient } from '@prisma/client';
import { BaseRepository } from './base.repository';
import { ComponentParameterEntity, IComponentParameterRepository } from '../../domain';

export class ComponentParameterRepository extends BaseRepository<ComponentParameterEntity> implements IComponentParameterRepository {

    constructor( prisma: PrismaClient ) {
        super( prisma );
    }

    get model() {
        return this.prisma.componentParamenter;
    }
}