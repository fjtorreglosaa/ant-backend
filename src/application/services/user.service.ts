import { CustomError, IProfileRepository, IUserRepository, ProfileEntity, UserEntity } from "../../domain";
import { JwtGenerator, UUID, encrypter } from "../../config/plugins";
import { CreateProfileDto, CreateUserDto, LoginUserDto } from "../dtos";
export class UserService {
 
    constructor( 
        private readonly userRepository: IUserRepository,
        private readonly profileRepository: IProfileRepository
    ) { }

    async registerUser( createUserDto: CreateUserDto, loggedUser: UserEntity | null = null ) {

        const userExists = await this.userRepository.getUserByEmail( createUserDto.email );
        if( userExists ) throw CustomError.badRequest( `User with email ${ createUserDto.email } already exists.` );

        try {

            const criteria = { ...createUserDto };
            const profileDto = new CreateProfileDto(
                UUID(),
                criteria.name,
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
                email: criteria.email,
                password: encrypter.hash( criteria.password ),
                isActive: true,
                profileId: profileDto.id,
                dependencyId: criteria.dependencyId,
                createdAt: new Date().toISOString() 
            });

            const userCreated = await this.userRepository.create( user );

            ( profileCreated && userCreated );

        }
        catch ( error ) {
            throw CustomError.internalServer(`${ error }`);
        }
    }

    async loginUser( loginUserDto: LoginUserDto ) {

        try {

            const user = await this.userRepository.getUserByEmail( loginUserDto.email );
            if( !user ) throw CustomError.badRequest('Email not exists');
    
            const hasMatch = encrypter.compare( loginUserDto.password, user.password! );
            if ( !hasMatch ) throw CustomError.badRequest('Password is not valid');
    
            const { password, ...data } = UserEntity.fromObject( user );
            const token = await JwtGenerator.generateToken({ id: data.id, email: data.email });
            if ( !token ) throw CustomError.internalServer('Error while creating JWT');
    
            return {
                user: data,
                token: token
            }

        }
        catch ( error ) {

            throw CustomError.internalServer(`${ error }`);

        }
    }
}