import { Request, Response } from "express";
import { UserService } from "../../../application";

export class UserController {

    constructor(
        private readonly userService : UserService
    ) { }

    // POST: http://localhost:3000/api/users/signup
    createUser = async ( req: Request, res: Response ) => {

        res.json({ message: 'Usuario registrado' });

        // const [ error, createStatusDto ] = CreateStatusDto.create( req.body );
        // if( error ) return res.status( 400 ).json({ error });

        // this.statusService.createStatus( createStatusDto!, req.body.user )
        //     .then( status => res.status(201).json({ created: status, message: 'status created successfully' }))
        //     .catch( error => ErrorHandler.handleError( error, res ));
    }

    // POST: http://localhost:3000/api/users/signin
    loginUser = async ( req: Request, res: Response ) => {

        res.json({ message: 'Usuario logeado' });

    }


}