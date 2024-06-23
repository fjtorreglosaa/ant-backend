import { UserEntity } from "../../../domain";
import { CreateUserDependencyDto, FilterDto, GetUserDependencyDto, ResultModel, UpdateUserDependencyDto } from "../../dtos";

export interface IUserDependencyService {
    createUserDependencies( createUserDependencyDtos: CreateUserDependencyDto[], loggedUser: UserEntity ): Promise<Boolean>
    updateUserDependencies(  updateUserDependencyDtos: UpdateUserDependencyDto[], loggedUser: UserEntity  ): Promise<Boolean>;
    removeUserDependencies( ids: string[] ): Promise<Boolean>;
    getUserDependenciesByUserIds( userIds: string[], filterDto: FilterDto ): Promise<ResultModel<GetUserDependencyDto[]> | null>;
}