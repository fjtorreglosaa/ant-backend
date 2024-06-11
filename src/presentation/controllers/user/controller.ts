import { Request, Response } from "express";
import { CreateUserDto, UserService } from "../../../application";
import { ErrorHandler } from "../../../common";

export class UserController {

    constructor(
        private readonly userService : UserService
    ) { }

    //* POST: http://localhost:3000/api/users/signup
    createUser = async ( req: Request, res: Response ) => {

        const [ error, createUserDto ] = CreateUserDto.create( req.body );
        if( error ) return res.status( 400 ).json({ error });

        this.userService.registerUser( createUserDto! )
             .then( user => res.status(201).json({ created: user, message: 'user created successfully' }))
             .catch( error => ErrorHandler.handleError( error, res ));
    }

    //* POST: http://localhost:3000/api/users/signin
    loginUser = async ( req: Request, res: Response ) => {

        res.json({ message: 'Usuario logeado' });

    }


}