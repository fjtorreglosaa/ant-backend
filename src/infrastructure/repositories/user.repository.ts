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

    async getUserByEmail( email: string ) : Promise<UserEntity | null> {
        
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
}