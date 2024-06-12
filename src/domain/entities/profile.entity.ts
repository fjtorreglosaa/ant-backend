import { Entity } from './base.entity';

export interface ProfileEntityOptions {
    id: string;
    name?: string;
    groupId?: string;
    isActive?: string;
    photo?: string;
    phone?: string;
    preferences?: string;
    createdBy?: string;
    updatedBy?: string;
    createdAt?: Date;
    updatedAt?: Date;
}

export class ProfileEntity extends Entity {

    public id: string;
    public name?: string;
    public groupId?: string;
    public isActive?: string;
    public photo?: string;
    public phone?: string;
    public preferences?: string;
    public createdBy?: string;
    public updatedBy?: string;
    public createdAt?: Date;
    public updatedAt?: Date;

    constructor( options: ProfileEntityOptions )
    {
        super();
        const { id, name, groupId, isActive, photo, phone, preferences, createdBy, updatedBy, createdAt, updatedAt } = options;

        this.id = id;
        this.name = name;
        this.groupId = groupId;
        this.isActive = isActive;
        this.photo = photo;
        this.phone = phone;
        this.preferences = preferences;
        this.createdBy = createdBy;
        this.updatedBy = updatedBy;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }

    static fromObject = ( object: { [key: string ]: any }): ProfileEntity => {

        const { id, name, groupId, isActive, photo, phone, preferences, createdBy, updatedBy, createdAt, updatedAt } = object;
        const profile = new ProfileEntity({  id, name, groupId, isActive, photo, phone, preferences, createdBy, updatedBy, createdAt, updatedAt  });

        return profile;
    }

}