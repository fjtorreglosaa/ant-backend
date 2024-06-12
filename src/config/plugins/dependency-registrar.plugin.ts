import { PrismaClient } from "@prisma/client";
import { container } from "./dependency-container.plugin";
import { ProfileRepository, RoleRepository, StatusRepository, UserRepository } from "../../infrastructure";
import { StatusService, UserService } from "../../application";
import { StatusController, UserController } from "../../presentation/controllers";

export class DependencyRegistrar {

  static registerDependencies() {

    //* Prima declaration
    const prisma = new PrismaClient();

    //* Repository declarations
    const statusRepository = new StatusRepository(prisma);
    const userRepository = new UserRepository(prisma);
    const profileRepository = new ProfileRepository(prisma);
    const roleRepository = new RoleRepository(prisma);

    //* Services declarations
    const statusService = new StatusService(statusRepository);
    const userService = new UserService(userRepository, profileRepository);

    //* Controller declarations
    const statusController = new StatusController(statusService);
    const userController = new UserController(userService);

    //* Prisma
    container.register('PrismaClient', prisma);

    //* Repositories register
    container.register('StatusRepository', statusRepository);
    container.register('UserRepository', userRepository);
    container.register('ProfileRepository', profileRepository);
    container.register('RoleRepository', roleRepository);

    //* Services register
    container.register('StatusService', statusService);
    container.register('UserService', userService);

    //* Controllers register
    container.register('StatusController', statusController);
    container.register('UserController', userController);

  }

}