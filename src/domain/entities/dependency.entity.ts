import { Entity } from './base.entity';

export interface DependencyEntityOptions {
    id: string;
    name?: string;
    parentId?: string;
    createdBy?: string;
    updatedBy?: string;
    createdAt?: Date;
    updatedAt?: Date;
}

export class DependencyEntity extends Entity {

    public id: string;
    public name?: string;
    public parentId?: string;
    public createdBy?: string;
    public updatedBy?: string;
    public createdAt?: Date;
    public updatedAt?: Date;

    constructor( options: DependencyEntityOptions )
    {
        super();
        const { id, name, parentId, createdBy, updatedBy, createdAt, updatedAt } = options;

        this.id = id;
        this.name = name;
        this.parentId = parentId;
        this.createdBy = createdBy;
        this.updatedBy = updatedBy;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }

    static fromObject = ( object: { [key: string ]: any }): DependencyEntity => {

        const { id, name, parentId, createdBy, updatedBy, createdAt, updatedAt } = object;
        const dependency = new DependencyEntity({ id, name, parentId, createdBy, updatedBy, createdAt, updatedAt });

        return dependency;
    }

}