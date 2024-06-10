import { Request, Response } from "express";
import { CreateStatusDto, StatusService } from "../../../application";
import { CustomError } from "../../../domain";

export class StatusController {

    constructor(
        private readonly statusService : StatusService
    ) { }

    private handleError = (error: unknown, res: Response ) => {
        
        if ( error instanceof CustomError ) {
          return res.status(error.statusCode).json({ error: error.message });
        }
    
        console.log(`${ error }`);
        return res.status(500).json({ error: 'Internal server error' })
    }

    // POST: http://localhost:3000/api/statuses
    createStatus = async ( req: Request, res: Response ) => {

        const [ error, createStatusDto ] = CreateStatusDto.create( req.body );
        if( error ) return res.status( 400 ).json({ error });

        this.statusService.createStatus( createStatusDto!, req.body.user )
            .then( status => res.status(201).json({ created: status, message: 'status created successfully' }))
            .catch( error => this.handleError( error, res ));
    }
}