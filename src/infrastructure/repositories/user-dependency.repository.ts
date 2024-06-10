import { PrismaClient } from '@prisma/client';
import { BaseRepository } from './base.repository';
import { IUserDependencyRepository, UserDependencyEntity } from '../../domain';

export class UserDependencyRepository extends BaseRepository<UserDependencyEntity> implements IUserDependencyRepository {

    constructor( prisma: PrismaClient ) {
        super( prisma );
    }

    get model() {
        return this.prisma.userDependency;
    }
}