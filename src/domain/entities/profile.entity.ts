import { Entity } from './base.entity';

export interface ProfileEntityOptions {
    id: string;
    name?: string;
    description?: string;
    createdBy?: string;
    updatedBy?: string;
    createdAt?: Date;
    updatedAt?: Date;
}

export class ProfileEntity extends Entity {

    public id: string;
    public name?: string;
    public description?: string;
    public createdBy?: string;
    public updatedBy?: string;
    public createdAt?: Date;
    public updatedAt?: Date;

    constructor( options: ProfileEntityOptions )
    {
        super();
        const { id, name, description, createdBy, updatedBy, createdAt, updatedAt } = options;

        this.id = id;
        this.name = name;
        this.description = description;
        this.createdBy = createdBy;
        this.updatedBy = updatedBy;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }

    static fromObject = ( object: { [key: string ]: any }): ProfileEntity => {

        const { id, name, description, createdBy, updatedBy, createdAt, updatedAt } = object;
        const profile = new ProfileEntity({ id, name, description, createdBy, updatedBy, createdAt, updatedAt });

        return profile;
    }

}