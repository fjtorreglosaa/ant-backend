import { Entity } from './base.entity';

export interface UserEntityOptions {
    id: string;
    name?: string;
    profileId?: string;
    username?: string;
    email?: string;
    password?: string;
    isActive?: boolean;
    userDependencyId?: string;
    createdBy?: string;
    updatedBy?: string;
    createdAt?: Date;
    updatedAt?: Date;
}

export class UserEntity extends Entity {

    public id: string;
    public name?: string;
    public profileId?: string;
    public username?: string;
    public email?: string;
    public password?: string;
    public isActive?: boolean;
    public userDependencyId?: string;
    public createdBy?: string;
    public updatedBy?: string;
    public createdAt?: Date;
    public updatedAt?: Date;

    constructor( options: UserEntityOptions )
    {
        super();
        const { id, name, profileId, username, email, password, isActive, userDependencyId, createdBy, updatedBy, createdAt, updatedAt } = options;

        this.id = id;
        this.name = name;
        this.profileId = profileId;
        this.username = username;
        this.email = email;
        this.password = password;
        this.isActive = isActive;
        this.userDependencyId = userDependencyId;
        this.createdBy = createdBy;
        this.updatedBy = updatedBy;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }

    static fromObject = ( object: { [key: string ]: any }): UserEntity => {

        const { id, name, profileId, username, email, password, isActive, userDependencyId, createdBy, updatedBy, createdAt, updatedAt } = object;
        const user = new UserEntity({ id, name, profileId, username, email, password, isActive, userDependencyId,createdBy, updatedBy, createdAt, updatedAt });

        return user;
    }

}