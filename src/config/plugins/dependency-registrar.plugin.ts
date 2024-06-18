import { PrismaClient } from "@prisma/client";
import { container } from "./dependency-container.plugin";
import { DependencyRepository, DependencyTypeRepository, ProfileRepository, RoleRepository, StatusRepository, UserDependencyRepository, UserRepository } from "../../infrastructure";
import { DependencyService, StatusService, UserDependencyService, UserService } from "../../application";
import { DependencyController, StatusController, UserController, UserDependencyController } from "../../presentation";

export class DependencyRegistrar {

  static registerDependencies() {

    //* Prima declaration
    const prisma = new PrismaClient();

    //* Repository declarations
    const statusRepository = new StatusRepository(prisma);
    const userRepository = new UserRepository(prisma);
    const profileRepository = new ProfileRepository(prisma);
    const roleRepository = new RoleRepository(prisma);
    const userDependencyRepository = new UserDependencyRepository(prisma);
    const dependencyRepository = new DependencyRepository(prisma);
    const dependencyTypeRepository = new DependencyTypeRepository(prisma)

    //* Services declarations
    const statusService = new StatusService(statusRepository);
    const userDependencyService = new UserDependencyService(userDependencyRepository, dependencyRepository, userRepository);
    const dependencyService = new DependencyService(dependencyRepository, dependencyTypeRepository, userDependencyService);
    const userService = new UserService(userRepository, profileRepository);

    //* Controller declarations
    const statusController = new StatusController(statusService);
    const userController = new UserController(userService);
    const userDependencyController = new UserDependencyController(userDependencyService);
    const dependencyController = new DependencyController(dependencyService);

    //* Prisma
    container.register('PrismaClient', prisma);

    //* Repositories register
    container.register('StatusRepository', statusRepository);
    container.register('UserRepository', userRepository);
    container.register('ProfileRepository', profileRepository);
    container.register('RoleRepository', roleRepository);
    container.register('UserDependencyRepository', userDependencyRepository);
    container.register('DependencyRepository', dependencyRepository);
    container.register('DependencyTypeRepository', dependencyTypeRepository);

    //* Services register
    container.register('StatusService', statusService);
    container.register('UserService', userService);
    container.register('DependencyService', dependencyService);
    container.register('UserDependencyService', userDependencyService);

    //* Controllers register
    container.register('StatusController', statusController);
    container.register('UserController', userController);
    container.register('UserDependencyController', userDependencyController);
    container.register('DependencyController', dependencyController);
  }

}