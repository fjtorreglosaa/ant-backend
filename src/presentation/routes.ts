import { Router } from "express";
import { StatusRoutes } from "./controllers";
import { DependencyContainer } from "../config/plugins";

export class AppRoutes {

    static routes( container: DependencyContainer ): Router {

        const router = Router();
    
        // Controllers
        router.use('/api/statuses', StatusRoutes.routes(container));
    
        return router;
        
      }
}