import { Entity } from './base.entity';

export interface ManufacturerEntityOptions {
    id: string;
    name?: string;
    createdBy?: string;
    updatedBy?: string;
    createdAt?: Date;
    updatedAt?: Date;
}

export class ManufacturerEntity extends Entity {

    public id: string;
    public name?: string;
    public createdBy?: string;
    public updatedBy?: string;
    public createdAt?: Date;
    public updatedAt?: Date;

    constructor( options: ManufacturerEntityOptions )
    {
        super();
        const { id, name, createdBy, updatedBy, createdAt, updatedAt } = options;

        this.id = id;
        this.name = name;
        this.createdBy = createdBy;
        this.updatedBy = updatedBy;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }

    static fromObject = ( object: { [key: string ]: any }): ManufacturerEntity => {

        const { id, name, createdBy, updatedBy, createdAt, updatedAt } = object;
        const manufacturer = new ManufacturerEntity({ id, name, createdBy, updatedBy, createdAt, updatedAt });

        return manufacturer;
    }

}