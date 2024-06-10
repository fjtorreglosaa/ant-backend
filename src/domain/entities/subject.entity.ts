import { Entity } from './base.entity';

export interface SubjectEntityOptions {
    id: string;
    name?: string;
    tag?: string;
    internalCode?: string;
    isActive?: boolean;
    image?: string;
    dependencyId?: string;
    subjectTypeId?: string;
    subjectParameterId?: string;
    locationId?: string;
    createdBy?: string;
    updatedBy?: string;
    createdAt?: Date;
    updatedAt?: Date;
}

export class SubjectEntity extends Entity {

    public id: string;
    public name?: string;
    public tag?: string;
    public internalCode?: string;
    public isActive?: boolean;
    public image?: string;
    public dependencyId?: string;
    public subjectTypeId?: string;
    public subjectParameterId?: string;
    public locationId?: string;
    public createdBy?: string;
    public updatedBy?: string;
    public createdAt?: Date;
    public updatedAt?: Date;

    constructor( options: SubjectEntityOptions )
    {
        super();

        const { 
            id, 
            name, 
            tag, 
            internalCode, 
            isActive, 
            image, 
            dependencyId, 
            subjectTypeId, 
            subjectParameterId, 
            locationId, 
            createdBy, 
            updatedBy, 
            createdAt, 
            updatedAt 
        } = options;

        this.id = id;
        this.name = name;
        this.tag = tag;
        this.internalCode = internalCode;
        this.isActive = isActive;
        this.image = image;
        this.dependencyId = dependencyId;
        this.subjectTypeId = subjectTypeId;
        this.subjectParameterId = subjectParameterId;
        this.locationId = locationId;
        this.createdBy = createdBy;
        this.updatedBy = updatedBy;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }

    static fromObject = ( object: { [key: string ]: any }): SubjectEntity => {

        const { 
            id, 
            name, 
            tag, 
            internalCode, 
            isActive, 
            image, 
            dependencyId, 
            subjectTypeId, 
            subjectParameterId, 
            locationId, 
            createdBy, 
            updatedBy, 
            createdAt, 
            updatedAt 
        } = object;

        const subject = new SubjectEntity({ 
            id, 
            name, 
            tag, 
            internalCode, 
            isActive, 
            image, 
            dependencyId, 
            subjectTypeId, 
            subjectParameterId, 
            locationId, 
            createdBy, 
            updatedBy, 
            createdAt, 
            updatedAt 
        });

        return subject;
    }

}