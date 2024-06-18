import { Router } from 'express';
import { DependencyContainer } from '../../../config/plugins';
import { DependencyController } from './controller';

export class DependencyRoutes {
    
    static routes( container: DependencyContainer ): Router {

        const router = Router();

        const dependencyController = container.resolve<DependencyController>('DependencyController');

        // Endpoints
        router.post('/', dependencyController.createDependency );
        router.put('/', dependencyController.updateDependencies );
        router.delete('/', dependencyController.removeDependencies );
        router.get('/childs', dependencyController.getChildDependencies );
        router.get('/parent', dependencyController.getParentDependency );

        return router;

    }
   
}