import { UserEntity } from "../../../domain";
import { CreateDependencyDto, GetDependencyDto } from "../../dtos";
import { UpdateDependencyDto } from '../../dtos/dependency/update-dependency.dto';

export interface IDependencyService {
    createDependency( createDependencyDto: CreateDependencyDto, loggedUser: UserEntity ): Promise<Boolean>;
    updateDependencies( updateDependencyDto: UpdateDependencyDto, loggedUser: UserEntity ): Promise<Boolean>;
    removeDependencies( id: string ): Promise<Boolean>;
    getChildDependencies( id: string ): Promise<GetDependencyDto[] | null>;
    getParentDependency( id: string ): Promise<GetDependencyDto[] | null>;
}