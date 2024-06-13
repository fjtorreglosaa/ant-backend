import { Router } from 'express';
import { DependencyContainer } from '../../../config/plugins';
import { UserController } from './controller';


export class UserRoutes {
    
    static routes( container: DependencyContainer ): Router {

        const router = Router();

        const userController = container.resolve<UserController>('UserController');

        // Routes
        router.get('/:id', userController.getUserById );
        router.get('/', userController.getAllUsers );
        router.get('/byterm', userController.getUsersBySearchedTerm );
        router.post('/signup', userController.createUser );
        router.post('/signin', userController.loginUser );
        router.put('/', userController.updateUser );

        return router;

    }
    
}
  