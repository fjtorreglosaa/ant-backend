import { UUID } from "../../config/plugins";
import { CustomError, DependencyEntity, IDependencyRepository, IDependencyTypeRepository, UserEntity } from "../../domain";
import { CreateDependencyDto, GetDependencyDto, UpdateDependencyDto } from "../dtos";
import { IDependencyService } from "./contracts";

export class DependencyService implements IDependencyService {

    constructor(
        private readonly dependencyRepository : IDependencyRepository,
        private readonly dependencyTypeRepository: IDependencyTypeRepository
    ) { }

    async createDependency( createDependencyDto: CreateDependencyDto, loggedUser: UserEntity ): Promise<Boolean> {
        try {
            const parentDependency = await this.dependencyRepository.findById( createDependencyDto.parentId );
                if( !parentDependency ) {
                    const badRequestMessage = `Cannot create the dependency, provided parentId ${ createDependencyDto.parentId } does not exist.`;
                    return false;
                }

                const dependencyType = await this.dependencyTypeRepository.findById( createDependencyDto.typeId );
                if( !dependencyType ) {
                    const badRequestMessage = `Cannot create the dependency, provided dependencyType ${ createDependencyDto.typeId } does not exist.`;
                    return false;
                }

                const dependency = DependencyEntity.fromObject({ 
                    id: UUID(),
                    ...createDependencyDto,
                    createdBy: loggedUser ? loggedUser.id : null,
                    createdAt: new Date().toISOString()
                });

                return await this.dependencyRepository.create( dependency );  
        }
        catch ( error ) {
            throw CustomError.internalServer( `Unexpected error on 'DependencyService.createDependency'. ${ error }` );
        }
    }


    async updateDependencies( updateDependencyDto: UpdateDependencyDto ): Promise<Boolean> {
        try {

        }
        catch ( error ) {
            
        }
        return false;
    }

    async removeDependencies( id: string ): Promise<Boolean> {

        return false;
    }

    async getChildDependencies(): Promise<GetDependencyDto[] | null> {

        return null;
    }

    async getParentDependency(): Promise<GetDependencyDto[] | null> {

        return null;
    }

}