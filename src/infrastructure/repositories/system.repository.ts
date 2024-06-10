import { PrismaClient } from '@prisma/client';
import { BaseRepository } from './base.repository';
import { ISystemRepository, SystemEntity } from '../../domain';

export class SystemRepository extends BaseRepository<SystemEntity> implements ISystemRepository {

    constructor( prisma: PrismaClient ) {
        super( prisma );
    }

    get model() {
        return this.prisma.system;
    }
}