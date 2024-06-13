import { IDependencyRepository } from "../../domain";
import { GetDependencyDto } from "../dtos";
import { IDependencyService } from "./contracts";

export class DependencyService implements IDependencyService {

    constructor(
        private readonly dependencyRepository : IDependencyRepository
    ) { }

    async createDependency(): Promise<Boolean> {

        return false;
    }

    async updateDependencies(): Promise<Boolean> {

        return false;
    }

    async removeDependencies(): Promise<Boolean> {

        return false;
    }

    async getChildDependencies(): Promise<GetDependencyDto[] | null> {

        return null;
    }

    async getParentDependency(): Promise<GetDependencyDto[] | null> {

        return null;
    }

}