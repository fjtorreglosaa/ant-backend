import { Router } from 'express';
import { StatusController } from './controller';
import { DependencyContainer } from '../../../config/plugins';

export class StatusRoutes {
    
    static routes( container: DependencyContainer ): Router {

        const router = Router();

        const statusController = container.resolve<StatusController>('StatusController');

        // Routes
        router.post('/', (req, res) => statusController.createStatus(req, res));

        return router;

    }
    
}
  