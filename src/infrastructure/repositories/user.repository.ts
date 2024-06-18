import { BaseRepository } from './base.repository';
import { PrismaClient } from '@prisma/client';
import { CustomError, IUserRepository, UserEntity } from '../../domain';

export class UserRepository extends BaseRepository<UserEntity> implements IUserRepository {

    constructor( prisma: PrismaClient ) {
        super( prisma );
    }

    get model() {
        return this.prisma.user;
    }

    async findUserByEmail( email: string ) : Promise<UserEntity | null> {
        try {
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
        catch ( error ) {
            throw CustomError.internalServer(`Unexpected error on 'UserRepository.findUserByEmail'. ${ error }`);
        }
    }

    async findUsersByEmail(term: string, page: number = 1, limit: number = 10): Promise<UserEntity[] | null> {
        try {
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
        catch ( error ) {
            throw CustomError.internalServer(`Unexpected error on 'UserRepository.findUsersByEmail'. ${ error }`);
        }
    }

    async findUsersByProfileName(term: string, page: number = 1, limit: number = 10): Promise<UserEntity[] | null> {
        try {
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
        catch ( error ) {
            throw CustomError.internalServer(`Unexpected error on 'UserRepository.findUsersByProfileName'. ${ error }`);
        }
    }

    async findUsersByIds(ids: string[], page: number = 1, limit: number = 10): Promise<UserEntity[] | null> {
        try {
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
        catch ( error ) {
            throw CustomError.internalServer(`Unexpected error on 'UserRepository.findUsersByIds'. ${ error }`);
        }
    }

    async findAllUsers(page: number = 1, limit: number = 10): Promise<UserEntity[] | null> {
        try {
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
        catch ( error ) {
            throw CustomError.internalServer(`Unexpected error on 'UserRepository.findAllUsers'. ${ error }`);
        }
    }
}