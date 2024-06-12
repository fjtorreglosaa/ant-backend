import { Entity } from './base.entity';

export interface UserEntityOptions {
    id: string;
    email?: string | null;
    password?: string | null;
    isActive?: boolean | null;
    profileId?: string | null;
    dependencyId?: string | null;
    createdBy?: string | null;
    updatedBy?: string | null;
    createdAt?: Date | null;
    updatedAt?: Date | null;
}

export class UserEntity extends Entity {

    public id: string;
    public email?: string | null;
    public password?: string | null;
    public isActive?: boolean | null;
    public profileId?: string | null;
    public dependencyId?: string | null;
    public createdBy?: string | null;
    public updatedBy?: string | null;
    public createdAt?: Date | null;
    public updatedAt?: Date | null;

    constructor( options: UserEntityOptions )
    {
        super();
        const { id, email, password, isActive, profileId, dependencyId, createdBy, updatedBy, createdAt, updatedAt } = options;

        this.id = id;
        this.email = email;
        this.password = password;
        this.isActive = isActive;
        this.profileId = profileId;
        this.dependencyId = dependencyId;
        this.createdBy = createdBy;
        this.updatedBy = updatedBy;
        this.createdAt = createdAt ? new Date(createdAt) : null;
        this.updatedAt = updatedAt ? new Date(updatedAt) : null;
    }

    static fromObject = ( object: { [key: string ]: any }): UserEntity => {

        const user = new UserEntity({
            id: object.id,
            email: object.email ?? null,
            password: object.password ?? null,
            isActive: object.isActive ?? null,
            profileId: object.profileId ?? null,
            dependencyId: object.dependencyId ?? null,
            createdBy: object.createdBy ?? null,
            updatedBy: object.updatedBy ?? null,
            createdAt: object.createdAt ? new Date(object.createdAt) : null,
            updatedAt: object.updatedAt ? new Date(object.updatedAt) : null,
          });

        return user;
    }

}