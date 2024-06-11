import { CustomError, IUserRepository, UserEntity } from "../../domain";
import { JwtGenerator, UUID, encrypter } from "../../config/plugins";
import { CreateUserDto } from "../dtos/user/create-user.dto";
import { LoginUserDto } from "../dtos/user/login-user.dto";

export class UserService {
 
    constructor( private readonly userRepository: IUserRepository ) { }

    async registerUser( createUserDto: CreateUserDto ) {

        try {

            const userExists = await this.userRepository.getUserByEmail( createUserDto.email );
            if( userExists ) throw CustomError.badRequest( `User with email ${ createUserDto.email } already exists.` );
    
            const criteria = { id: UUID(), createdAt: Date.now.toString(), ...createUserDto };
            const user = UserEntity.fromObject( criteria );
            const result = await this.userRepository.create( user );

            return result;

        }
        catch ( error ) {
            throw CustomError.internalServer(`${ error }`);
        }
    }

    async loginUser( loginUserDto: LoginUserDto ) {

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

}