import { PrismaClient } from '@prisma/client';
import { BaseRepository } from './base.repository';
import { IStatusRepository, StatusEntity } from '../../domain';

export class StatusRepository extends BaseRepository<StatusEntity> implements IStatusRepository {

    constructor( prisma: PrismaClient ) {
        super( prisma );
    }

    get model() {
        return this.prisma.status;
    }

    async getStatusByName( name: string ): Promise<StatusEntity | null> {
        
        const status = await this.model.findFirst({
            where: {
                name: name
            } 
        });

        if (!status) {
            return null;
        }
        
        return StatusEntity.fromObject(status);

    }
}