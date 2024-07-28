import { Router } from 'express';
import { DependencyContainer } from '../../../config/plugins';
import { UserController } from './controller';
import { AuthMiddleware } from '../../middlewares';

export class UserRoutes {
    
    static routes( container: DependencyContainer ): Router {

        const router = Router();

        const userController = container.resolve<UserController>('UserController');

        // Endpoints
        router.get('/byterm', [AuthMiddleware.validateJWT], userController.getUsersBySearchedTerm);
        router.get('/', [AuthMiddleware.validateJWT], userController.getAllUsers);
        router.get('/:id', [AuthMiddleware.validateJWT], userController.getUserById);
        router.post('/signup', userController.createUser);
        router.post('/signin', userController.loginUser);
        router.put('/', [AuthMiddleware.validateJWT], userController.updateUser);

        //! TODO: Nuevas rutas
        /*
        * Eliminar usuario                      --> DELETE
        * Desactivar usuario                    --> PUT
        * Actualizar credenciales de usuario    --> PUT
        * Asignar grupo a usuario               --> POST
        * Asignar dependencia a usuario         --> POST
        * Asignar permisos a usuario            --> POST
        * Asignar roles al perfil del usuario   --> POST
        * Obtener roles del perfil del usuario  --> GET
        * Obtener permisos del usuario          --> GET
        * Obtener dependencias del usuario      --> GET
        * Obtener grupos del usuario            --> GET
        * Eliminar roles del perfil del usuario --> DELETE
        * Eliminar dependencias del usuario     --> DELETE
        * Eliminar permisos del usuario         --> DELETE
        * Eliminar grupos del usuario           --> DELETE
        */

        return router;

    }
   
}