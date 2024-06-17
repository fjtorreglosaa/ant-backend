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
        try{
            updateUserDependencyDtos.forEach( async dto => {
                const { userId, dependencyIds } = dto;
                //! TODO: Revisar las dependencias que el usuario tiene actualmente
                //! TODO: Remover las dependencias que el usuario tiene actualmente y que no estan en el request
                //! TODO: Agregar las dependencias que vienen en el request y que no tiene el usuario actualmente
            });

            return true;
        }
        catch ( error ) {
            throw CustomError.internalServer( `Unexpected error on 'UserDependencyService.updateUserDependencies'. ${ error }` );
        }
    }

    async removeUserDependencies( ids: string[] ): Promise<Boolean> {
        try{
            const numberOfUserDependencies = await this.userDependencyRepository.findCountOfUserDependenciesByUserIds( ids )

            if( ids.length !== numberOfUserDependencies ) return false;

            ids.forEach( async id => {
                await this.userDependencyRepository.delete( id );
            });

            return true;
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