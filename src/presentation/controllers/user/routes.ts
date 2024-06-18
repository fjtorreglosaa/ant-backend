import { Router } from 'express';
import { DependencyContainer } from '../../../config/plugins';
import { UserController } from './controller';
import { AuthMiddleware } from '../../middlewares';

export class UserRoutes {
    
    static routes( container: DependencyContainer ): Router {

        const router = Router();

        const userController = container.resolve<UserController>('UserController');

        // Endpoints
        router.get('/:id', [ AuthMiddleware.validateJWT ], userController.getUserById );
        router.get('/', [ AuthMiddleware.validateJWT ], userController.getAllUsers );
        router.get('/byterm', [ AuthMiddleware.validateJWT ], userController.getUsersBySearchedTerm );
        router.post('/signup', userController.createUser );
        router.post('/signin', userController.loginUser );
        router.put('/', [ AuthMiddleware.validateJWT ], userController.updateUser );

        return router;

    }
   
}