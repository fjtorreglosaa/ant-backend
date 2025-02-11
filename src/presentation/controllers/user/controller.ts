import { Request, Response } from "express";
import { ErrorHandler } from "../../../common";
import { CreateUserDto, FilterDto, LoginUserDto, PaginationDto, SearchedTermDto, UpdateUserDto, UserService } from "../../../application";
import { IUserService } from "../../../application/services/contracts";

export class UserController {

    constructor(
        private readonly userService : IUserService
    ) { }

    //* POST: http://localhost:3000/api/users/signup
    createUser = ( req: Request, res: Response ) => {

        const [ error, createUserDto ] = CreateUserDto.create( req.body );
        if( error ) return res.status( 400 ).json({ error });

        this.userService.createUser( createUserDto!, req.body.user )
             .then( user => res.status(201).json({ created: user, message: 'user created successfully' }))
             .catch( error => ErrorHandler.handleError( error, res ));
    }

    //* POST: http://localhost:3000/api/users/signin
    loginUser = ( req: Request, res: Response ) => {

        const [ error, loginUserDto ] = LoginUserDto.create( req.body );
        if( error ) return res.status( 400 ).json({ error });

        this.userService.loginUser( loginUserDto! )
             .then( login => res.status(200).json( login ))
             .catch( error => ErrorHandler.handleError( error, res ));

    }

    //* PUT: http://localhost:3000/api/users
    updateUser = ( req: Request, res: Response ) => {

        const [ errors, updateUserDto ] = UpdateUserDto.create( req.body );

        if( errors ) return res.status( 400 ).json({ errors: errors });

        this.userService.updateUser( updateUserDto!, req.body.user )
            .then( user => res.status(200).json( user ))
            .catch( error => ErrorHandler.handleError( error, res ));
    }

    //* GET: http://localhost:3000/api/users/byterm?page=[page]&limit=[limit]
    getUsersBySearchedTerm = ( req: Request, res: Response ) => {
        const { page = 1, limit = 10 } = req.query;

        const [ paginationError, paginationDto ] = PaginationDto.create( +page, +limit );
        if( paginationError ) return res.status( 400 ).json({ paginationError });

        const [ error, searchedTermDto ] = SearchedTermDto.create( req.body );
        if( error ) return res.status( 400 ).json({ error });

        this.userService.getUsersByProfileName({ searchedTerm: searchedTermDto, pagination: paginationDto } as FilterDto )
            .then( user => res.status(200).json( user ))
            .catch( error => ErrorHandler.handleError( error, res ));
    }

    //* GET: http://localhost:3000/api/users?page=[page]&limit=[limit]
    getAllUsers = ( req: Request, res: Response ) => {
        const { page = 1, limit = 10 } = req.query;

        const [ paginationError, paginationDto ] = PaginationDto.create( +page, +limit );
        if( paginationError ) return res.status( 400 ).json({ paginationError });

        this.userService.getUserAllUsers({ pagination: paginationDto } as FilterDto )
            .then( user => res.status(200).json( user ))
            .catch( error => ErrorHandler.handleError( error, res ));
    }

}