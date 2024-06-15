import e from "express";
import { CustomError, IUserDependencyRepository, UserDependencyEntity } from "../../domain";
import { FilterDto, GetUserDependencyDto } from "../dtos";
import { IUserDependencyService } from "./contracts";

export class UserDependencyService implements IUserDependencyService {

    constructor(
        private readonly userDependencyRepository: IUserDependencyRepository
    ) { }

    async createUserDependencies(): Promise<Boolean> {

        return false;
    }

    async updateUserDependencies(): Promise<Boolean> {

        return false;
    }

    async removeUserDependencies(): Promise<Boolean> {

        return false;
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