import { Router } from "express";
import { StatusRoutes, UserRoutes } from "./controllers";
import { DependencyContainer } from "../config/plugins";
import { AuthMiddleware } from "./middlewares/auth.middleware";

export class AppRoutes {

    static routes( container: DependencyContainer ): Router {

        const router = Router();

        // Middlewares
    
        // Controllers
        router.use('/api/users', UserRoutes.routes(container));
        router.use('/api/statuses', [ AuthMiddleware.validateJWT ], StatusRoutes.routes(container));
    
        return router;
        
      }
}