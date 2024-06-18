import { Router } from 'express';
import { DependencyContainer } from '../../../config/plugins';
import { UserDependencyController } from './controller';

export class UserDependencyRoutes {
    
    static routes( container: DependencyContainer ): Router {

        const router = Router();

        const userDependencyController = container.resolve<UserDependencyController>('UserDependencyController');

        // Endpoints
        router.post('/', userDependencyController.createUserDependencies );
        router.put('/', userDependencyController.updateUserDependencies );
        router.delete('/', userDependencyController.removeUserDependencies );
        router.get('/', userDependencyController.getUserDependenciesByUserIds );

        return router;

    }
   
}