import { BaseRepository } from './base.repository';
import { PrismaClient } from '@prisma/client';
import { IUserRepository, UserEntity } from '../../domain';

export class UserRepository extends BaseRepository<UserEntity> implements IUserRepository {

    constructor( prisma: PrismaClient ) {
        super( prisma );
    }

    get model() {
        return this.prisma.user;
    }
}