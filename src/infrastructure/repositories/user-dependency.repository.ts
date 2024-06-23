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

    async createUserDependencies( userDependencies: UserDependencyEntity[] ): Promise<Boolean> {      
        try {
            const result = await this.model.createMany({
                data: userDependencies
            });

            return result ? true : false;    
        }
        catch ( error ) {
            return false;
        }
    }

    async findUserDependenciesByUserIdsNoPaginated( ids: string[] ): Promise<UserDependencyEntity[] | null> {
        try {
            const users = await this.model.findMany({
                where: {
                    userId: {
                        in: ids
                    }
                }
            });
    
            if( users.length === 0 ) return null;
    
            return users.map(user => UserDependencyEntity.fromObject(user));
        }
        catch ( error ){
            return null;
        }
    }

    async findUserDependenciesByUserIds(ids: string[], page: number = 1, limit: number = 10): Promise<{ total: number, data: UserDependencyEntity[] } | null> {
        try {
            const [total, users] = await Promise.all([
                this.model.count({
                    where: {
                        userId: {
                            in: ids
                        }
                    }
                }),
                this.model.findMany({
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
                })
            ]);
    
            if (users.length === 0) return null;
    
            return {
                total,
                data: users.map(user => UserDependencyEntity.fromObject(user))
            };
        } catch (error) {
            return null;
        }
    }

    async findCountOfUserDependenciesByUserIds( ids: string[] ): Promise<number> {
        try{
            const userDependencyCount = await this.model.count({
                where: {
                    userId: {
                        in: ids
                    }
                },
            });
    
            return userDependencyCount;
        }
        catch ( error ) {
            return 0;
        }
    }

    async removeUserDependenciesByIds( dependencyIds: string[] ): Promise<boolean> {
        try {
            await this.model.deleteMany({
                where: {
                    dependencyId: {
                      in: dependencyIds
                    }
                  }
            });
            return true;
        } catch (error) {
            return false;
        }
    }
}