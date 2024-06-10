import { UUID } from "../../config/plugins";
import { CustomError, IStatusRepository, StatusEntity, UserEntity } from "../../domain";
import { CreateStatusDto } from "../dtos/status/create-status.dto";

export class StatusService {

    constructor( private readonly statusRepository: IStatusRepository ) { }

    async createStatus( createStatusDto: CreateStatusDto, user: UserEntity ) {

        try {

            const statusExists = await this.statusRepository.getStatusByName( createStatusDto.name );
            if( statusExists ) throw CustomError.badRequest( 'Category already exists' );
    
            const criteria = { id: UUID(), createdBy: user.id, ...createStatusDto };
            const statusToCreate = StatusEntity.fromObject( criteria );
            const result = await this.statusRepository.create( statusToCreate );

            return result;

        }
        catch ( error ) {
            throw CustomError.internalServer(`${ error }`);
        }

    }

}