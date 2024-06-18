import { Request, Response } from "express";
import { ErrorHandler } from "../../../common";
import { IDependencyService } from "../../../application/services/contracts";

export class DependencyController {

    constructor(
        private readonly dependencyService : IDependencyService
    ) { }

    //* POST: http://localhost:3000/api/dependencies
    createDependency = ( req: Request, res: Response ) => {
        return res.json('Respuesta: createDependencies OK');
    }

    //* PUT: http://localhost:3000/api/dependencies
    updateDependencies = ( req: Request, res: Response ) => {
        return res.json('Respuesta: updateDependencies OK');
    }

    //* DELETE: http://localhost:3000/api/dependencies
    removeDependencies = ( req: Request, res: Response ) => {
        return res.json('Respuesta: removeDependencies OK');
    }

    //* GET: http://localhost:3000/api/dependencies/childs
    getChildDependencies = ( req: Request, res: Response ) => {
        return res.json('Respuesta: getChildDependencies OK');
    }

    //* GET: http://localhost:3000/api/dependencies/parent
    getParentDependency = ( req: Request, res: Response ) => {
        return res.json('Respuesta: getParentDependency OK');
    }

}