import { Entity } from './base.entity';

export interface SubjectTypeEntityOptions {
    id: string;
    name?: string;
    createdBy?: string;
    updatedBy?: string;
    createdAt?: Date;
    updatedAt?: Date;
}

export class SubjectTypeEntity extends Entity {

    public id: string;
    public name?: string;
    public createdBy?: string;
    public updatedBy?: string;
    public createdAt?: Date;
    public updatedAt?: Date;

    constructor( options: SubjectTypeEntityOptions )
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

    static fromObject = ( object: { [key: string ]: any }): SubjectTypeEntity => {

        const { id, name, createdBy, updatedBy, createdAt, updatedAt } = object;
        const subjectType = new SubjectTypeEntity({ id, name, createdBy, updatedBy, createdAt, updatedAt });

        return subjectType;
    }

}