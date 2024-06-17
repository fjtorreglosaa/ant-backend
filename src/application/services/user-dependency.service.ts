import { CustomError, IDependencyRepository, IUserDependencyRepository, IUserRepository, UserDependencyEntity, UserEntity } from "../../domain";
import { CreateUserDependencyDto, FilterDto, GetUserDependencyDto, UpdateUserDependencyDto } from "../dtos";
import { IUserDependencyService } from "./contracts";
import { UUID } from "../../config/plugins";

export class UserDependencyService implements IUserDependencyService {

    constructor(
        private readonly userDependencyRepository: IUserDependencyRepository,
        private readonly dependencyRepository: IDependencyRepository,
        private readonly userRepository: IUserRepository
    ) { }

    async createUserDependencies( createUserDependencyDtos: CreateUserDependencyDto[], loggedUser: UserEntity ): Promise<Boolean> {
        try{

            const userDependencyEntities: UserDependencyEntity[] = [];

            createUserDependencyDtos.forEach(async dto => {
                const { userId, dependencyIds } = dto;
                const user = await this.userRepository.findById( userId );
                if ( !user ) return false;

                dependencyIds.forEach( async id => {
                    const dependency = await this.dependencyRepository.findById( id );
                    if ( !dependency ) return false;

                    userDependencyEntities.push(UserDependencyEntity.fromObject({
                        id: UUID(),
                        userId: dto.userId,
                        dependencyId: id,
                        createdAt: new Date().toISOString(),
                        createdBy: loggedUser.id
                    }))
                })
            });

            if( userDependencyEntities.length === 0 ) return false;

            const result = await this.userDependencyRepository.createUserDependencies( userDependencyEntities );

            return result;
        }
        catch ( error ) {
            throw CustomError.internalServer( `Unexpected error on 'UserDependencyService.createUserDependencies'. ${ error }` );
        }
    }

    async updateUserDependencies( updateUserDependencyDtos: UpdateUserDependencyDto[], loggedUser: UserEntity  ): Promise<Boolean> {
        try {
            const entities: UserDependencyEntity[] = [];
            const userIds = updateUserDependencyDtos.map( dto => dto.userId );
            const currentUserDependencies = await this.userDependencyRepository.findUserDependenciesByUserIdsNoPaginated( userIds );
            
            if ( !currentUserDependencies ) return false;
            
            const userDependenciesIds = currentUserDependencies.map( x => x.dependencyId! );
            const removedUserDependencies = await this.userDependencyRepository.removeUserDependenciesByIds( userDependenciesIds );
            if ( !removedUserDependencies ) return false;

            updateUserDependencyDtos.forEach(dto => {
                const { userId, dependencyIds } = dto;
                dependencyIds.forEach( userDependencyId => {
                    const entity = UserDependencyEntity.fromObject({
                        id: UUID(),
                        userId: userId,
                        userDependencyId: userDependencyId,
                        createdAt: new Date().toISOString(),
                        createdBy: loggedUser.id
                    })

                    entities.push( entity );
                })
            });

            if( !entities ) return false;

            const createdUserDependencies = await this.userDependencyRepository.createUserDependencies( entities );

            return createdUserDependencies;
        }
        catch ( error ) {
            throw CustomError.internalServer( `Unexpected error on 'UserDependencyService.updateUserDependencies'. ${ error }` );
        }
    }

    async removeUserDependencies( ids: string[] ): Promise<Boolean> {
        try{
            const result = await this.userDependencyRepository.removeUserDependenciesByIds( ids );
            return result;
        }
        catch ( error ) {
            throw CustomError.internalServer( `Unexpected error on 'UserDependencyService.removeUserDependencies'. ${ error }` );
        }
    }

    async getUserDependenciesByUserIds( userIds: string[], filterDto: FilterDto ): Promise<GetUserDependencyDto[] | null> {
        try {
            const { page, limit } = filterDto.pagination;
            const userDependencies = await this.userDependencyRepository.findUserDependenciesByUserIds( userIds, page, limit );

            if ( !userDependencies ) return null;
            
            if( userDependencies?.length === 0 ) return null;

            const userDependenciesFromDB : GetUserDependencyDto[] = [];

            userDependencies.forEach( userDependency => {
                let entity = UserDependencyEntity.fromObject( userDependency );
                let dto = GetUserDependencyDto.create( entity )[1];
                userDependenciesFromDB.push( dto! );    
            });

            return userDependenciesFromDB;
        }
        catch ( error ) {
            throw CustomError.internalServer( `Unexpected error on 'UserDependencyService.getUserDependenciesByIds'. ${ error }` );
        }
    }
}