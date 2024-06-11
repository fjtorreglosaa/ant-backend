import jwt from 'jsonwebtoken';
import { envs } from './envs.plugin';

const JWT_SEED = envs.JWT_SEED;

export class JwtGenerator {

    static async generateToken( payload: any, duration: string = '24h' ) {

        return new Promise( resolve => {

            jwt.sign( payload, JWT_SEED, { expiresIn: duration }, (err, token) => {

                if( err ) return resolve( null );

                return resolve( token );

            });

        });
    }

    static validateToken<T>( token: string ): Promise<T | null> {

        return new Promise( ( resolve ) => {

            jwt.verify( token, JWT_SEED, ( error, decoded ) => {
                
                if( error ) return resolve( null );

                return resolve( decoded as T );

            });

        });

    }

}