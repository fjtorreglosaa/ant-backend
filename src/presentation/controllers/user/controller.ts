import { Request, Response } from "express";
import { ErrorHandler } from "../../../common";
import { CreateUserDto, FilterDto, LoginUserDto, PaginationDto, SearchedTermDto, UpdateUserDto } from "../../../application";
import { IUserService } from "../../../application/services/contracts";

export class UserController {

    constructor(
        private readonly userService : IUserService
    ) { }

    //* POST: http://localhost:3000/api/users/signup
    /**
     * @openapi
     * /api/users/signup:
     *   post:
     *     tags:
     *       - Users
     *     description: Crea un nuevo usuario
     *     requestBody:
     *       content:
     *         application/json:
     *           schema:
     *             $ref: '#/components/schemas/CreateUserDto'
     *     responses:
     *       201:
     *         description: Usuario creado exitosamente
     *       400:
     *         description: Error en la solicitud
     */
    createUser = ( req: Request, res: Response ) => {

        const [ error, createUserDto ] = CreateUserDto.create( req.body );
        if( error ) return res.status( 400 ).json({ error });

        this.userService.createUser( createUserDto!, req.body.user )
             .then( user => res.status(201).json({ created: user, message: 'user created successfully' }))
             .catch( error => ErrorHandler.handleError( error, res ));
    }

    //* POST: http://localhost:3000/api/users/signin
    /**
     * @openapi
     * /api/users/signin:
     *   post:
     *     tags:
     *       - Users
     *     description: Inicia sesión un usuario
     *     requestBody:
     *       content:
     *         application/json:
     *           schema:
     *             $ref: '#/components/schemas/LoginUserDto'
     *     responses:
     *       200:
     *         description: Sesión iniciada exitosamente
     *       400:
     *         description: Error en la solicitud
     */
    loginUser = ( req: Request, res: Response ) => {

        const [ error, loginUserDto ] = LoginUserDto.create( req.body );
        if( error ) return res.status( 400 ).json({ error });

        this.userService.loginUser( loginUserDto! )
             .then( login => res.status(200).json( login ))
             .catch( error => ErrorHandler.handleError( error, res ));

    }

    //* PUT: http://localhost:3000/api/users
    /**
     * @openapi
     * /api/users:
     *   put:
     *     tags:
     *       - Users
     *     description: Actualiza un usuario
     *     security:
     *       - bearerAuth: []
     *     requestBody:
     *       content:
     *         application/json:
     *           schema:
     *             $ref: '#/components/schemas/UpdateUserDto'
     *     responses:
     *       200:
     *         description: Usuario actualizado exitosamente
     *       400:
     *         description: Error en la solicitud
     */
    updateUser = ( req: Request, res: Response ) => {

        const [ errors, updateUserDto ] = UpdateUserDto.create( req.body );

        if( errors ) return res.status( 400 ).json({ errors: errors });

        this.userService.updateUser( updateUserDto!, req.body.user )
            .then( user => res.status(200).json( user ))
            .catch( error => ErrorHandler.handleError( error, res ));
    }

    //* GET: http://localhost:3000/api/users/byterm?page=[page]&limit=[limit]
    /**
     * @openapi
     * /api/users/byterm:
     *   get:
     *     tags:
     *       - Users
     *     description: Obtiene usuarios por término de búsqueda
     *     security:
     *       - bearerAuth: []
     *     parameters:
     *       - name: page
     *         in: query
     *         required: false
     *         schema:
     *           type: integer
     *           default: 1
     *       - name: limit
     *         in: query
     *         required: false
     *         schema:
     *           type: integer
     *           default: 10
     *     requestBody:
     *       content:
     *         application/json:
     *           schema:
     *             $ref: '#/components/schemas/SearchedTermDto'
     *     responses:
     *       200:
     *         description: Lista de usuarios
     *       400:
     *         description: Error en la solicitud
     */
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
    /**
     * @openapi
     * /api/users:
     *   get:
     *     tags:
     *       - Users
     *     description: Obtiene todos los usuarios
     *     security:
     *       - bearerAuth: []
     *     parameters:
     *       - name: page
     *         in: query
     *         required: false
     *         schema:
     *           type: integer
     *           default: 1
     *       - name: limit
     *         in: query
     *         required: false
     *         schema:
     *           type: integer
     *           default: 10
     *     responses:
     *       200:
     *         description: Lista de usuarios
     *       400:
     *         description: Error en la solicitud
     */
    getAllUsers = ( req: Request, res: Response ) => {
        const { page = 1, limit = 10 } = req.query;

        const [ paginationError, paginationDto ] = PaginationDto.create( +page, +limit );
        if( paginationError ) return res.status( 400 ).json({ paginationError });

        this.userService.getUserAllUsers({ pagination: paginationDto } as FilterDto )
            .then( user => res.status(200).json( user ))
            .catch( error => ErrorHandler.handleError( error, res ));
    }

    //* GET: http://localhost:3000/api/users/{id}
    /**
     * @openapi
     * /api/users/{id}:
     *   get:
     *     tags:
     *       - Users
     *     description: Obtiene un usuario por ID
     *     security:
     *       - bearerAuth: []
     *     parameters:
     *       - name: id
     *         in: path
     *         required: true
     *         schema:
     *           type: string
     *     responses:
     *       200:
     *         description: Usuario obtenido exitosamente
     *       400:
     *         description: Error en la solicitud
     */
    getUserById = ( req: Request, res: Response ) => {
        const userId = req.params.id;

        this.userService.getUserById( userId )
            .then( user => res.status(200).json( user ))
            .catch( error => ErrorHandler.handleError( error, res ));
    }
    
}