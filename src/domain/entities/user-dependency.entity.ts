import { Entity } from './base.entity';

export interface UserDependencyEntityOptions {
    id: string;
    userId?: string;
    dependencyId?: string;
    createdBy?: string;
    updatedBy?: string;
    createdAt?: Date;
    updatedAt?: Date;
}

export class UserDependencyEntity extends Entity {

    public id: string;
    public userId?: string;
    public dependencyId?: string;
    public createdBy?: string;
    public updatedBy?: string;
    public createdAt?: Date;
    public updatedAt?: Date;

    constructor( options: UserDependencyEntityOptions )
    {
        super();
        const { id, userId, dependencyId, createdBy, updatedBy, createdAt, updatedAt } = options;

        this.id = id;
        this.userId = userId;
        this.dependencyId = dependencyId;
        this.createdBy = createdBy;
        this.updatedBy = updatedBy;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }

    static fromObject = ( object: { [key: string ]: any }): UserDependencyEntity => {

        const { id, userId, dependencyId, createdBy, updatedBy, createdAt, updatedAt } = object;
        const userDependency = new UserDependencyEntity({ id, userId, dependencyId, createdBy, updatedBy, createdAt, updatedAt });

        return userDependency;
    }

}