import { Entity } from './base.entity';

export interface LocationEntityOptions {
    id: string;
    name?: string;
    createdBy?: string;
    updatedBy?: string;
    createdAt?: Date;
    updatedAt?: Date;
}

export class LocationEntity extends Entity {

    public id: string;
    public name?: string;
    public createdBy?: string;
    public updatedBy?: string;
    public createdAt?: Date;
    public updatedAt?: Date;

    constructor( options: LocationEntityOptions )
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

    static fromObject = ( object: { [key: string ]: any }): LocationEntity => {

        const { id, name, createdBy, updatedBy, createdAt, updatedAt } = object;
        const location = new LocationEntity({ id, name, createdBy, updatedBy, createdAt, updatedAt });

        return location;
    }

}