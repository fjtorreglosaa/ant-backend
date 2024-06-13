import { CustomError, IProfileRepository, IUserRepository, ProfileEntity, UserEntity } from "../../domain";
import { JwtGenerator, UUID, encrypter } from "../../config/plugins";
import { CreateProfileDto, CreateUserDto, GetUserDto, LoginUserDto, PaginationDto, SearchedTermDto, UpdateUserDto } from "../dtos";

export class UserService {
 
    constructor( 
        private readonly userRepository: IUserRepository,
        private readonly profileRepository: IProfileRepository
    ) { }

    private async getUserByEmail( email: string ) : Promise<UserEntity | null> {
        const user = await this.userRepository.getUserByEmail( email );
        return user;
    }

    async getUserById() : Promise<GetUserDto | null> {
        return null;
    }

    async getUserAllUsers() : Promise<GetUserDto[] | null> {
        return null;
    }

    async getUsersBySearchedTerm( term: SearchedTermDto, paginationDto: PaginationDto ) : Promise<GetUserDto[] | null> {
        
        const { page, limit } = paginationDto;

        try {
            
            return null;

        }
        catch (error){
            throw CustomError.internalServer( 'Internal server error' );
        }
    }

    async registerUser( createUserDto: CreateUserDto, loggedUser: UserEntity | null = null ) : Promise<Boolean> {

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
            throw CustomError.internalServer(`${ error }`);
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
            throw CustomError.internalServer(`${ error }`);
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
            throw CustomError.internalServer(`${ error }`);
        }
    }
}