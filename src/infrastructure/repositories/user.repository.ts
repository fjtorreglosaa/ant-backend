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

    async findUserByEmail( email: string ) : Promise<UserEntity | null> {

        const user = await this.model.findFirst({
            where:{
                email: email
            }
        });

        if (!user) {
            return null;
        }

        return UserEntity.fromObject( user );
    }

    async findUsersByEmail(term: string, page: number = 1, limit: number = 10): Promise<UserEntity[] | null> {

        const lowerTerm = term.toLowerCase();
        const users = await this.model.findMany({
            where: {
                OR: [
                    { email: { contains: lowerTerm } }
                ]
            },
            skip: (page - 1) * limit,
            take: limit
        });

        if( users.length === 0 ) return null;

        return users.map(user => UserEntity.fromObject(user));
    }

    async findUsersByProfileName(term: string, page: number = 1, limit: number = 10): Promise<UserEntity[] | null> {

        const upperTerm = term.toUpperCase();
        const users = await this.model.findMany({
            where: {
                profile: {
                    name: {
                        contains: upperTerm,
                    }
                }
            },
            include: {
                profile: true
            },
            skip: (page - 1) * limit,
            take: limit
        });

        if( users.length === 0 ) return null;

        return users.map(user => UserEntity.fromObject(user));
    }

    async findUsersByIds(ids: string[], page: number = 1, limit: number = 10): Promise<UserEntity[] | null> {
        const users = await this.model.findMany({
            where: {
                id: {
                    in: ids
                }
            },
            skip: (page - 1) * limit,
            take: limit
        });

        if( users.length === 0 ) return null;

        return users.map(user => UserEntity.fromObject(user));
    }

    async findAllUsers(page: number = 1, limit: number = 10): Promise<UserEntity[] | null> {
        const users = await this.model.findMany({
            skip: (page - 1) * limit,
            take: limit,
            include: {
                profile: true
            }
        });

        if( users.length === 0 ) return null;

        return users.map(user => UserEntity.fromObject(user));
    }
}