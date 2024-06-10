import { PrismaClient } from '@prisma/client';
import { BaseRepository } from './base.repository';
import { ILocationRepository, LocationEntity } from '../../domain';

export class LocationRepository extends BaseRepository<LocationEntity> implements ILocationRepository {

    constructor( prisma: PrismaClient ) {
        super( prisma );
    }

    get model() {
        return this.prisma.location;
    }
}