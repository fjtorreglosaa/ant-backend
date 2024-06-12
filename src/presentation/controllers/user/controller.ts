import { Request, Response } from "express";
import { CreateUserDto, UserService } from "../../../application";
import { ErrorHandler } from "../../../common";
import { LoginUserDto } from '../../../application/dtos/user/login-user.dto';

export class UserController {

    constructor(
        private readonly userService : UserService
    ) { }

    //* POST: http://localhost:3000/api/users/signup
    createUser = async ( req: Request, res: Response ) => {

        const [ error, createUserDto ] = CreateUserDto.create( req.body );
        if( error ) return res.status( 400 ).json({ error });

        this.userService.registerUser( createUserDto!, req.body.user )
             .then( user => res.status(201).json({ created: user, message: 'user created successfully' }))
             .catch( error => ErrorHandler.handleError( error, res ));
    }

    //* POST: http://localhost:3000/api/users/signin
    loginUser = async ( req: Request, res: Response ) => {

        const [ error, loginUserDto ] = LoginUserDto.create( req.body );
        if( error ) return res.status( 400 ).json({ error });

        this.userService.loginUser( loginUserDto! )
             .then( login => res.status(200).json( login ))
             .catch( error => ErrorHandler.handleError( error, res ));

    }


}