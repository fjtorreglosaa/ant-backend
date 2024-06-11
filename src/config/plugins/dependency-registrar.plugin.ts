import { PrismaClient } from "@prisma/client";
import { container } from "./dependency-container.plugin";
import { RoleRepository, StatusRepository, UserRepository } from "../../infrastructure";
import { StatusService, UserService } from "../../application";
import { StatusController, UserController } from "../../presentation/controllers";

export class DependencyRegistrar {

  static registerDependencies() {

    const prisma = new PrismaClient();

    const statusRepository = new StatusRepository(prisma);
    const userRepository = new UserRepository(prisma);
    const roleRepository = new RoleRepository(prisma);

    const statusService = new StatusService(statusRepository);
    const userService = new UserService(userRepository);

    const statusController = new StatusController(statusService);
    const userController = new UserController(userService);

    // Prisma
    container.register('PrismaClient', prisma);

    // Repositories
    container.register('StatusRepository', statusRepository);
    container.register('UserRepository', userRepository);
    container.register('RoleRepository', roleRepository);

    // Services
    container.register('StatusService', statusService);
    container.register('UserService', userService);

    // Controllers
    container.register('StatusController', statusController);
    container.register('UserController', userController);

  }

}