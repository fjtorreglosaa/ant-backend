import { CustomError, IBaseRepository } from '../../domain';
import { PrismaClient } from '@prisma/client';

export abstract class BaseRepository<Entity> implements IBaseRepository<Entity> {

    protected readonly prisma: PrismaClient;

    constructor( prisma: PrismaClient ) { 
        this.prisma = prisma;
    }

    abstract get model(): any;

    async create(item: Entity): Promise<boolean> {
        try {
            await this.model.create({ data: item });
            return true;
        } catch (error) {
            console.error("Error creating entity:", error);
            return false;
        }
    }

    async update(id: string, item: Entity): Promise<boolean> {
        try {
            await this.model.update({
                where: { id: id },
                data: item
            });
            return true;
        } catch (error) {
            return false;
        }
    }

    async delete(id: string): Promise<boolean> {
        try {
            await this.model.delete({
                where: { id: id }
            });
            return true;
        } catch (error) {
            return false;
        }
    }

    async find(): Promise<Entity[]> {
        try {
            return await this.model.findMany();
        } catch (error) {
            return [];
        }
    }

    async findById(id: string): Promise<Entity | null> {
        try {
            return await this.model.findUnique({
                where: { id: id }
            });
        } catch (error) {
            return null;
        }
    }

}