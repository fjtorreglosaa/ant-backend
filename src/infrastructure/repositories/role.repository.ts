import { PrismaClient } from '@prisma/client';
import { BaseRepository } from './base.repository';
import { IRoleRepository, RoleEntity } from '../../domain';

export class RoleRepository extends BaseRepository<RoleEntity> implements IRoleRepository {

    constructor( prisma: PrismaClient ) {
        super( prisma );
    }

    get model() {
        return this.prisma.role;
    }
}