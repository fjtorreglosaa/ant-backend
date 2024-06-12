import { NextFunction, Request, Response } from "express";
import { UserEntity } from "../../domain";
import { JwtGenerator, container } from "../../config/plugins";
import { RoleRepository, UserRepository } from "../../infrastructure";

export class AuthMiddleware {

    static async validateJWT( req: Request, res: Response, next: NextFunction ) {

        const authorization = req.header('Authorization');
        const userRepository: UserRepository = container.resolve('UserRepository');
        const roleRepository: RoleRepository = container.resolve('RoleRepository');

        if( !authorization ) return res.status( 401 ).json( { error: 'No token provided' });
        if( !authorization.startsWith( 'Bearer ')) return res.status( 401 ).json({ error: 'Invalid bearer token' });

        const token = authorization.split(' ').at(1) || '';

        try {

            const payload = await JwtGenerator.validateToken<{ id: string, roleId: string }>( token );
            if( !payload ) return res.status( 401 ).json({ error: 'Invalid token' });

            const user = await userRepository.findById( payload.id ); 
            if( !user ) return res.status(401).json({ error: 'Invalid user' });

            const role = roleRepository.findById( payload.roleId );
            if( !role ) return res.status(401).json({ error: 'User requires' });

            req.body.user = UserEntity.fromObject( user );

            next();

        }
        catch ( error ) {

            console.log( error );
            res.status( 500 ).json({ error: 'Internal Server Error' });
        }

    }

}