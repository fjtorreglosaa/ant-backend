import { PrismaClient } from '@prisma/client';
import { BaseRepository } from './base.repository';
import { IProfileRepository, ProfileEntity } from '../../domain';

export class ProfileRepository extends BaseRepository<ProfileEntity> implements IProfileRepository {

    constructor( prisma: PrismaClient ) {
        super( prisma );
    }

    get model() {
        return this.prisma.profile;
    }
}