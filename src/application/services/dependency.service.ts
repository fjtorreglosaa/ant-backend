import { UUID } from "../../config/plugins";
import { CustomError, DependencyEntity, IDependencyRepository, IDependencyTypeRepository, UserEntity } from "../../domain";
import { CreateDependencyDto, GetDependencyDto, UpdateDependencyDto } from "../dtos";
import { IDependencyService, IUserDependencyService } from "./contracts";

export class DependencyService implements IDependencyService {

    constructor(
        private readonly dependencyRepository: IDependencyRepository,
        private readonly dependencyTypeRepository: IDependencyTypeRepository, 
        private readonly userDependencyService: IUserDependencyService 
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

    async updateDependencies( updateDependencyDto: UpdateDependencyDto, loggedUser: UserEntity  ): Promise<Boolean> {
        try {
            const { id, name, typeId, parentId } = updateDependencyDto;

            if( !parentId ) {
                const badRequestMessage = `Cannot create the dependency, provided parentId ${ parentId } does not exist.`;
                return false;
            }

            const dependencyType = await this.dependencyTypeRepository.findById( typeId );
            if( !dependencyType ) {
                const badRequestMessage = `Cannot create the dependency, provided dependencyType ${ typeId } does not exist.`;
                return false;
            }

            const entity = DependencyEntity.fromObject({
                id,
                name,
                typeId,
                parentId,
                modifiedBy: loggedUser.id,
                updatedAt: new Date().toISOString()
            });

            const result = await this.dependencyRepository.update( id, entity );

            return result;
        }
        catch ( error ) {
            throw CustomError.internalServer( `Unexpected error on 'DependencyService.updateDependencies'. ${ error }` );
        }
    }

    async removeDependencies( id: string ): Promise<Boolean> {
        try {
            const dependency = await this.dependencyRepository.findById( id );
            if ( dependency ) {
                const badRequestMessage = `Cannot create the dependency, provided parentId ${ id } does not exist.`;
                return false;
            }

            await this.userDependencyService.removeUserDependencies([ id ]);
            const result = await this.dependencyRepository.delete( id );

            return result;
        }
        catch ( error ) {
            throw CustomError.internalServer( `Unexpected error on 'DependencyService.removeDependencies'. ${ error }` );
        }
    }

    async getChildDependencies( id: string ): Promise<GetDependencyDto[] | null> {
        try {
            const result: GetDependencyDto[] = [];
            const childs = await this.dependencyRepository.getChildDependencies( id );
            if ( !childs ) return [];

            childs.forEach(child => {

                const data = GetDependencyDto.create({ 
                    id: child.id, 
                    name: child.name, 
                    typeId: child.typeId, 
                    parentId: child.parentId, 
                    createdBy: child.createdBy, 
                    updatedBy: child.updatedBy, 
                    createdAt: child.createdAt, 
                    updatedAt: child.updatedAt 
                })[1];

                result.push( data! );
            });

            if ( result.length === 0 ) return null;

            return result;
        }
        catch ( error ) {
            throw CustomError.internalServer( `Unexpected error on 'DependencyService.getChildDependencies'. ${ error }` );
        }
    }

    async getParentDependency( id: string ): Promise<GetDependencyDto[] | null> {
        try {
            return null;
        }
        catch ( error ) {
            throw CustomError.internalServer( `Unexpected error on 'DependencyService.getParentDependency'. ${ error }` );
        }
    }

}