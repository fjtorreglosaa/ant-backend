import { Entity } from './base.entity';

export interface UserEntityOptions {
    id: string;
    name?: string | null;
    profileId?: string | null;
    username?: string | null;
    email?: string | null;
    password?: string | null;
    isActive?: boolean | null;
    userDependencyId?: string | null;
    createdBy?: string | null;
    updatedBy?: string | null;
    createdAt?: Date | null;
    updatedAt?: Date | null;
}

export class UserEntity extends Entity {

    public id: string;
    public name?: string | null;
    public profileId?: string | null;
    public username?: string | null;
    public email?: string | null;
    public password?: string | null;
    public isActive?: boolean | null;
    public userDependencyId?: string | null;
    public createdBy?: string | null;
    public updatedBy?: string | null;
    public createdAt?: Date | null;
    public updatedAt?: Date | null;

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
        this.createdAt = createdAt ? new Date(createdAt) : null;
        this.updatedAt = updatedAt ? new Date(updatedAt) : null;
    }

    static fromObject = ( object: { [key: string ]: any }): UserEntity => {

        const user = new UserEntity({
            id: object.id,
            name: object.name ?? null,
            profileId: object.profileId ?? null,
            username: object.username ?? null,
            email: object.email ?? null,
            password: object.password ?? null,
            isActive: object.isActive ?? null,
            userDependencyId: object.userDependencyId ?? null,
            createdBy: object.createdBy ?? null,
            updatedBy: object.updatedBy ?? null,
            createdAt: object.createdAt ? new Date(object.createdAt) : null,
            updatedAt: object.updatedAt ? new Date(object.updatedAt) : null,
          });

        return user;
    }

}