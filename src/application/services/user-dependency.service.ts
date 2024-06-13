import { IUserDependencyRepository } from "../../domain";
import { IUserDependencyService } from "./contracts";

export class UserDependencyService implements IUserDependencyService {

    constructor(
        private readonly userDependencyRepository: IUserDependencyRepository
    ) { }

    async createUserDependencies(): Promise<Boolean> {

        return false;
    }

    async updateUserDependencies(): Promise<Boolean> {

        return false;
    }

    async removeUserDependencies(): Promise<Boolean> {

        return false;
    }

}