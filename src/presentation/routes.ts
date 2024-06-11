import { Router } from "express";
import { StatusRoutes, UserRoutes } from "./controllers";
import { DependencyContainer } from "../config/plugins";
import { AuthMiddleware } from "./middlewares/auth.middleware";

export class AppRoutes {

    static routes( container: DependencyContainer ): Router {

        const router = Router();

        // Middlewares
        //router.use( AuthMiddleware.validateJWT );
    
        // Controllers
        router.use('/api/statuses', StatusRoutes.routes(container));
        router.use('/api/users', UserRoutes.routes(container));
    
        return router;
        
      }
}