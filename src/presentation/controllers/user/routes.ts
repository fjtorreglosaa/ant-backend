import { Router } from 'express';
import { DependencyContainer } from '../../../config/plugins';
import { StatusController } from '../status/controller';
import { UserController } from './controller';


export class UserRoutes {
    
    static routes( container: DependencyContainer ): Router {

        const router = Router();

        const userController = container.resolve<UserController>('UserController');

        // Routes
        router.post('/', (req, res) => userController.createUser(req, res));

        return router;

    }
    
}
  