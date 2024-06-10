import { Entity } from './base.entity';

export interface SystemEntityOptions {
    id: string;
    name?: string;
    parentId?: string;
    description?: string;
    createdBy?: string;
    updatedBy?: string;
    createdAt?: Date;
    updatedAt?: Date;
}

export class SystemEntity extends Entity {

    public id: string;
    public name?: string;
    public parentId?: string;
    public description?: string;
    public createdBy?: string;
    public updatedBy?: string;
    public createdAt?: Date;
    public updatedAt?: Date;

    constructor( options: SystemEntityOptions )
    {
        super();
        const { id, name, parentId, description, createdBy, updatedBy, createdAt, updatedAt } = options;

        this.id = id;
        this.name = name;
        this.parentId = parentId;
        this.description = description;
        this.createdBy = createdBy;
        this.updatedBy = updatedBy;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }

    static fromObject = ( object: { [key: string ]: any }): SystemEntity => {

        const { id, name, parentId, description, createdBy, updatedBy, createdAt, updatedAt } = object;
        const system = new SystemEntity({ id, name, parentId, description, createdBy, updatedBy, createdAt, updatedAt });

        return system;
    }

}