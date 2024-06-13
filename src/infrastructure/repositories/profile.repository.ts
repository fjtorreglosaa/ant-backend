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

    async findProfilesByName(term: string, page: number, limit: number): Promise<ProfileEntity[]> {

        const lowerTerm = term.toLowerCase();
        const users = await this.model.findMany({
            where: {
                OR: [
                    { name: { contains: lowerTerm } },
                ]
            },
            skip: (page - 1) * limit,
            take: limit
        });

        return users.map(user => ProfileEntity.fromObject(user));

    }
}