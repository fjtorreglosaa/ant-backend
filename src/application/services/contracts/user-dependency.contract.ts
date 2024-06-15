import { FilterDto, GetUserDependencyDto } from "../../dtos";

export interface IUserDependencyService {
    createUserDependencies(): Promise<Boolean>;
    updateUserDependencies(): Promise<Boolean>;
    removeUserDependencies(): Promise<Boolean>;
    getUserDependenciesByUserIds( userIds: string[], filterDto: FilterDto  ): Promise<GetUserDependencyDto[] | null>;
}