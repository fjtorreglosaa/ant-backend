import { Entity } from './base.entity';

export interface ComponentEntityOptions {
    id: string;
    name?: string;
    image?: string;
    parentId?: string;
    equipmentId?: string;
    systemId?: string;
    manufacturerId?: string;
    statusId?: string;
    createdBy?: string;
    updatedBy?: string;
    createdAt?: Date;
    updatedAt?: Date;
}

export class ComponentEntity extends Entity {

    public id: string;
    public name?: string;
    public image?: string;
    public parentId?: string;
    public equipmentId?: string;
    public systemId?: string;
    public manufacturerId?: string;
    public statusId?: string;
    public createdBy?: string;
    public updatedBy?: string;
    public createdAt?: Date;
    public updatedAt?: Date;

    constructor( options: ComponentEntityOptions )
    {
        super();
        const { 
            id, 
            name, 
            image, 
            parentId, 
            equipmentId, 
            systemId, 
            manufacturerId, 
            statusId, 
            createdBy, 
            updatedBy, 
            createdAt, 
            updatedAt 
        } = options;

        this.id = id;
        this.name = name;
        this.image = image;
        this.parentId = parentId;
        this.equipmentId = equipmentId;
        this.systemId = systemId;
        this.manufacturerId = manufacturerId;
        this.statusId = statusId;
        this.createdBy = createdBy;
        this.updatedBy = updatedBy;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }

    static fromObject = ( object: { [key: string ]: any }): ComponentEntity => {

        const { 
            id, 
            name, 
            image, 
            parentId, 
            equipmentId, 
            systemId, 
            manufacturerId, 
            statusId, 
            createdBy, 
            updatedBy, 
            createdAt, 
            updatedAt 
        } = object;

        const component = new ComponentEntity({ 
            id, 
            name, 
            image, 
            parentId, 
            equipmentId, 
            systemId, 
            manufacturerId, 
            statusId, 
            createdBy, 
            updatedBy, 
            createdAt, 
            updatedAt });

        return component;
    }

}