import { GetDependencyDto } from "../../dtos";

export interface IDependencyService {
    createDependency(): Promise<Boolean>;
    updateDependencies(): Promise<Boolean>;
    removeDependencies(): Promise<Boolean>;
    getChildDependencies(): Promise<GetDependencyDto[] | null>;
    getParentDependency(): Promise<GetDependencyDto[] | null>;
}