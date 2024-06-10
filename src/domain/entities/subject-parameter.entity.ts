import { Entity } from './base.entity';

export interface SubjectParameterEntityOptions {
    id: string;
    name?: string;
    model?: string;
    series?: string;
    currentOperatingTime?: number;
    currentOperatingDistance?: number;
    warrantyTime?: number;
    warrantyDistance?: number;
    createdBy?: string;
    updatedBy?: string;
    createdAt?: Date;
    updatedAt?: Date;
}

export class SubjectParameterEntity extends Entity {

    public id: string;
    public name?: string;
    public model?: string;
    public series?: string;
    public currentOperatingTime?: number;
    public currentOperatingDistance?: number;
    public warrantyTime?: number;
    public warrantyDistance?: number;
    public createdBy?: string;
    public updatedBy?: string;
    public createdAt?: Date;
    public updatedAt?: Date;

    constructor( options: SubjectParameterEntityOptions )
    {
        super();

        const { 
            id, 
            name, 
            model, 
            series, 
            currentOperatingTime, 
            currentOperatingDistance, 
            warrantyTime, 
            warrantyDistance, 
            createdBy, 
            updatedBy, 
            createdAt, 
            updatedAt 
        } = options;

        this.id = id;
        this.name = name;
        this.model = model; 
        this.series = series;
        this.currentOperatingTime = currentOperatingTime; 
        this.currentOperatingDistance = currentOperatingDistance;
        this.warrantyTime = warrantyTime;
        this.warrantyDistance = warrantyDistance;
        this.createdBy = createdBy;
        this.updatedBy = updatedBy;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }

    static fromObject = ( object: { [key: string ]: any }): SubjectParameterEntity => {

        const { 
            id, 
            name, 
            model, 
            series, 
            currentOperatingTime, 
            currentOperatingDistance, 
            warrantyTime, 
            warrantyDistance, 
            createdBy, 
            updatedBy, 
            createdAt, 
            updatedAt 
        } = object;
        
        const subjectParameter = new SubjectParameterEntity({ 
            id, 
            name, 
            model, 
            series, 
            currentOperatingTime, 
            currentOperatingDistance, 
            warrantyTime, 
            warrantyDistance, 
            createdBy, 
            updatedBy, 
            createdAt, 
            updatedAt 
        });

        return subjectParameter;
    }

}