import { Request, Response } from "express";
import { ErrorHandler } from "../../../common";
import { IUserDependencyService } from "../../../application/services/contracts";

export class UserDependencyController {

    constructor(
        private readonly userDependencyService : IUserDependencyService
    ) { }

    //* POST: http://localhost:3000/api/userdependencies
    createUserDependencies = ( req: Request, res: Response ) => {
        return res.json('Respuesta: createUserDependencies OK');
    }

    //* PUT: http://localhost:3000/api/userdependencies
    updateUserDependencies = ( req: Request, res: Response ) => {
        return res.json('Respuesta: updateUserDependencies OK');
    }

    //* DELETE: http://localhost:3000/api/userdependencies
    removeUserDependencies = ( req: Request, res: Response ) => {
        return res.json('Respuesta: removeUserDependencies OK');
    }

    //* GET: http://localhost:3000/api/userdependencies
    getUserDependenciesByUserIds = ( req: Request, res: Response ) => {
        return res.json('Respuesta: getUserDependenciesByUserIds OK');
    }
    
}