import { PrismaClient } from '@prisma/client';
import { BaseRepository } from './base.repository';
import { DependencyEntity, IDependencyRepository } from '../../domain';

export class DependencyRepository extends BaseRepository<DependencyEntity> implements IDependencyRepository {

    constructor( prisma: PrismaClient ) {
        super( prisma );
    }

    get model() {
        return this.prisma.dependency;
    }

    async getChildDependencies( dependencyId: string ): Promise<DependencyEntity[] | null | undefined>{
        try {

            const childDependencies = await this.model.findMany({
                where:{
                    parentId: dependencyId
                }
            });

            if( childDependencies.length === 0 ) return null;

            return childDependencies.map(child => DependencyEntity.fromObject(child));
        }
        catch ( error ) {

        }
    }
}