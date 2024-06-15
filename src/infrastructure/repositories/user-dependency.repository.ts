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

    async findUserDependenciesByUserIds(ids: string[], page: number = 1, limit: number = 10): Promise<UserDependencyEntity[] | null> {
        const users = await this.model.findMany({
            where: {
                userId: {
                    in: ids
                }
            },
            skip: (page - 1) * limit,
            take: limit,
            orderBy: [
                {
                    userId: 'desc'
                }
            ]
        });

        if( users.length === 0 ) return null;

        return users.map(user => UserDependencyEntity.fromObject(user));
    }
}