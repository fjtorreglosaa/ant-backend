import { PrismaClient } from '@prisma/client';
import { BaseRepository } from './base.repository';
import { IManufacturerRepository, ManufacturerEntity } from '../../domain';

export class ManufacturerRepository extends BaseRepository<ManufacturerEntity> implements IManufacturerRepository {

    constructor( prisma: PrismaClient ) {
        super( prisma );
    }

    get model() {
        return this.prisma.manufacturer;
    }
}