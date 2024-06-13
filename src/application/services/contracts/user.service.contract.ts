import { UserEntity } from "../../../domain";
import { CreateUserDto, FilterDto, GetUserDto, LoginUserDto, UpdateUserDto } from "../../dtos";

export interface IUserService {
    getUserByEmail( email: string ) : Promise<UserEntity | null>;
    getUserById( id: string ) : Promise<GetUserDto | null>;
    getUserAllUsers( filter: FilterDto ) : Promise<GetUserDto[] | null>;
    getUsersByProfileName( filter: FilterDto ) : Promise<GetUserDto[] | null>;
    createUser( createUserDto: CreateUserDto, loggedUser: UserEntity | null ) : Promise<Boolean>;
    loginUser( loginUserDto: LoginUserDto ) : Promise<any>;
    updateUser( updateUserDto: UpdateUserDto, reqUser: UserEntity ) : Promise<Boolean>;
    deleteUser( userId: string ): Promise<Boolean>;
}