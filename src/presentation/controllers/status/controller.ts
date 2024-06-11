import { Request, Response } from "express";
import { CreateStatusDto, StatusService } from "../../../application";
import { ErrorHandler } from "../../../common";

export class StatusController {

    constructor(
        private readonly statusService : StatusService
    ) { }

    // POST: http://localhost:3000/api/statuses
    createStatus = async ( req: Request, res: Response ) => {

        const [ error, createStatusDto ] = CreateStatusDto.create( req.body );
        if( error ) return res.status( 400 ).json({ error });

        this.statusService.createStatus( createStatusDto!, req.body.user )
            .then( status => res.status(201).json({ created: status, message: 'status created successfully' }))
            .catch( error => ErrorHandler.handleError( error, res ));
    }
}