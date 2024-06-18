import { JwtGenerator, UUID, encrypter } from "../../config/plugins";
import { CustomError, IProfileRepository, IUserRepository, ProfileEntity, UserEntity } from "../../domain";
import { CreateProfileDto, CreateUserDto, FilterDto, GetUserDto, LoginUserDto, UpdateUserDto } from "../dtos";
import { IUserService } from "./contracts";

export class UserService implements IUserService {
 
    constructor( 
        private readonly userRepository: IUserRepository,
        private readonly profileRepository: IProfileRepository
    ) { }

    async getUserByEmail( email: string ) : Promise<UserEntity | null> {
        try {
            const user = await this.userRepository.findUserByEmail( email );
            if ( !user )  return null;

            return user;
        }
        catch ( error ) {
            throw CustomError.internalServer( `Unexpected error on 'UserService.getUserByEmail'. ${ error }` );
        }
    }

    async getUserById( id: string ) : Promise<GetUserDto | null> {
        try {
            const user = await this.userRepository.findById( id );
            if ( !user )  return null;
    
            return GetUserDto.fromObject( user );
        }
        catch ( error ) { 
            throw CustomError.internalServer( `Unexpected error on 'UserService.getUserById'. ${ error }` );
        }
    }

    async getUserAllUsers( filter: FilterDto ) : Promise<GetUserDto[] | null> {
        try {
            const { page, limit } = filter.pagination;
            const users = await this.userRepository.findAllUsers( page, limit );
            if ( !users )  return null;

            const result : GetUserDto[] = [];

            users.forEach( user => {
                result.push( GetUserDto.fromObject( user ));
            });
    
            return result;
        }
        catch ( error ) { 
            throw CustomError.internalServer( `Unexpected error on 'UserService.getUserAllUsers'. ${ error }` );
        }
    }

    async getUsersByProfileName( filter: FilterDto ) : Promise<GetUserDto[] | null> {
        const { page, limit } = filter.pagination;

        try {
            const users = await this.userRepository.findUsersByProfileName( filter.searchedTerm!.term, page, limit );

            if ( users != null ){
                const result : GetUserDto[] = [];

                users.forEach(user => {
                    result.push(GetUserDto.fromObject(user));
                });

                return result;
            }

            return null;
        }
        catch (error){
            throw CustomError.internalServer( `Unexpected error on 'UserService.getUsersByProfileName'. ${ error }` );
        }
    }

    async createUser( createUserDto: CreateUserDto, loggedUser: UserEntity | null = null ) : Promise<Boolean> {
        const userExists = await this.getUserByEmail( createUserDto.email );
        if( userExists ) throw CustomError.badRequest( `User with email ${ createUserDto.email } already exists.` );

        try {

            const criteria = { ...createUserDto };
            const profileDto = new CreateProfileDto(
                UUID(),
                criteria.name.toUpperCase(),
                criteria.groupId,
                criteria.photo,
                criteria.phone,
                criteria.preferences
            );

            const profile = ProfileEntity.fromObject({ 
                ...profileDto, 
                isActive: true,
                createdBy: loggedUser ? loggedUser.id : null, 
                createdAt: new Date().toISOString() 
            });
            
            const profileCreated = await this.profileRepository.create( profile );

            const user = UserEntity.fromObject({
                id: UUID(),
                email: criteria.email.toLowerCase(),
                password: encrypter.hash( criteria.password ),
                isActive: true,
                profileId: profileDto.id,
                dependencyId: criteria.dependencyId,
                createdAt: new Date().toISOString() 
            });

            const userCreated = await this.userRepository.create( user );

            return profileCreated && userCreated;
        }
        catch ( error ) {
            throw CustomError.internalServer( `Unexpected error on 'UserService.createUser'. ${ error }` );
        }
    }

    async loginUser( loginUserDto: LoginUserDto ) : Promise<any> {
        const user = await this.getUserByEmail( loginUserDto.email );
        if( !user ) throw CustomError.badRequest('Email not exists');

        try {
            const hasMatch = encrypter.compare( loginUserDto.password, user!.password! );
            if ( !hasMatch ) throw CustomError.badRequest('Password is not valid');
    
            const { password, ...data } = UserEntity.fromObject( user! );
            const token = await JwtGenerator.generateToken( data );
            if ( !token ) throw CustomError.internalServer('Error while creating JWT');
    
            return {
                token: token
            }
        }
        catch ( error ) {
            throw CustomError.internalServer( `Unexpected error on 'UserService.loginUser'. ${ error }` );
        }
    }

    async updateUser( updateUserDto: UpdateUserDto, reqUser: UserEntity ) : Promise<Boolean> {
        const user = await this.getUserByEmail( updateUserDto.email );
        if( !user ) throw CustomError.badRequest('Email not exists');

        try {

            const currentProfile = await this.profileRepository.findById( user.profileId! );
            if( !currentProfile ) throw CustomError.internalServer('Profile not exists');

            const profileData = ProfileEntity.fromObject({
                id: currentProfile.id,
                name: updateUserDto.name.toUpperCase() ?? currentProfile.name,
                groupId: updateUserDto.groupId ?? currentProfile.groupId,
                isActive: updateUserDto.isActive ?? currentProfile.isActive,
                photo: updateUserDto.photo ?? currentProfile.photo,
                phone: updateUserDto.phone ?? currentProfile.phone,
                preferences: updateUserDto.preferences ?? currentProfile.preferences,
                updatedBy: reqUser.id ?? null,
                updatedAt: new Date().toISOString() 
            });

            const profileUpdated = await this.profileRepository.update( currentProfile.id, profileData );

            const userData = UserEntity.fromObject({
                id: user.id,
                email: updateUserDto.email.toLowerCase() ?? user.email,
                password: encrypter.hash( updateUserDto.password ) ?? user.password,
                isActive: updateUserDto.isActive ?? user.isActive,
                profileId: updateUserDto.profileId ?? user.profileId,
                updatedBy: reqUser.id ?? null,
                updatedAt: new Date().toISOString() 
            });

            const userUpdated = await this.userRepository.update( user.id, userData );

            return profileUpdated && userUpdated;
        }
        catch ( error ) {
            throw CustomError.internalServer( `Unexpected error on 'UserService.updateUser'. ${ error }` );
        }
    }

    async deleteUser( userId: string ): Promise<Boolean> {
        try {
            const userToDelete = await this.userRepository.findById( userId );
            if( !userToDelete ) throw CustomError.badRequest( `User with ${ userId } does not exist` );
            
            return await this.userRepository.delete( userToDelete.id );
        }
        catch ( error ) {
            throw CustomError.internalServer( `Unexpected error on 'UserService.deleteUser'. ${ error }` );
        }
    }
}