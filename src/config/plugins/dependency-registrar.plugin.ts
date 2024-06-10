import { PrismaClient } from "@prisma/client";
import { container } from "./dependency-container.plugin";
import { StatusRepository } from "../../infrastructure";
import { StatusService } from "../../application";
import { StatusController } from "../../presentation/controllers";

export class DependencyRegistrar {

  static registerDependencies() {

    // Prisma
    const prisma = new PrismaClient();
    container.register('PrismaClient', prisma);

    // Repositories
    const statusRepository = new StatusRepository(prisma);
    container.register('StatusRepository', statusRepository);

    // Services
    const statusService = new StatusService(statusRepository);
    container.register('StatusService', statusService);

    // Controllers
    const statusController = new StatusController(statusService);
    container.register('StatusController', statusController);

  }

}