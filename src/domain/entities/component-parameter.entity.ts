import { Entity } from './base.entity';

export interface ComponentParameterEntityOptions {
    id: string;
    name?: string;
    model?: string;
    series?: string;
    internalCode?: string;
    externalCode?: string;
    cost?: number;
    dailyWorkTime?: number;
    estimatedChangeoverDate?: Date;
    changeoverFrequencyTime?: number;
    changeoverFrequencyDistance?: number;
    currentOperatingTime?: number;
    currentOperatingDistance?: number;
    distanceFromInstallation?: number;
    timeFromInstallation?: number;
    dailyWorkDistance?: number;
    expectedServiceLife?: number;
    expectedServiceDistance?: number;
    manufacterId?: string;
    createdBy?: string;
    updatedBy?: string;
    createdAt?: Date;
    updatedAt?: Date;
}

export class ComponentParameterEntity extends Entity {

    public id: string;
    public name?: string;
    public model?: string;
    public series?: string;
    public internalCode?: string;
    public externalCode?: string;
    public cost?: number;
    public dailyWorkTime?: number;
    public estimatedChangeoverDate?: Date;
    public changeoverFrequencyTime?: number;
    public changeoverFrequencyDistance?: number;
    public currentOperatingTime?: number;
    public currentOperatingDistance?: number;
    public distanceFromInstallation?: number;
    public timeFromInstallation?: number;
    public dailyWorkDistance?: number;
    public expectedServiceLife?: number;
    public expectedServiceDistance?: number;
    public manufacterId?: string;
    public createdBy?: string;
    public updatedBy?: string;
    public createdAt?: Date;
    public updatedAt?: Date;

    constructor( options: ComponentParameterEntityOptions )
    {
        super();

        const { 
            id, 
            name, 
            model,
            series,
            internalCode,
            externalCode,
            cost,
            dailyWorkTime,
            estimatedChangeoverDate,
            changeoverFrequencyTime,
            changeoverFrequencyDistance,
            currentOperatingTime,
            currentOperatingDistance,
            distanceFromInstallation,
            timeFromInstallation,
            dailyWorkDistance,
            expectedServiceLife,
            expectedServiceDistance,
            manufacterId,
            createdBy, 
            updatedBy, 
            createdAt, 
            updatedAt 
        } = options;

        this.id = id;
        this.name = name;
        this.model = model;
        this.series = series;
        this.internalCode = internalCode;
        this.externalCode = externalCode;
        this.cost = cost;
        this.dailyWorkTime = dailyWorkTime;
        this.estimatedChangeoverDate = estimatedChangeoverDate;
        this.changeoverFrequencyTime = changeoverFrequencyTime;
        this.changeoverFrequencyDistance = changeoverFrequencyDistance;
        this.currentOperatingTime = currentOperatingTime;
        this.currentOperatingDistance = currentOperatingDistance;
        this.distanceFromInstallation = distanceFromInstallation;
        this.timeFromInstallation = timeFromInstallation;
        this.dailyWorkDistance = dailyWorkDistance;
        this.expectedServiceLife = expectedServiceLife;
        this.expectedServiceDistance = expectedServiceDistance;
        this.manufacterId = manufacterId;
        this.createdBy = createdBy;
        this.updatedBy = updatedBy;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }

    static fromObject = ( object: { [key: string ]: any }): ComponentParameterEntity => {

        const { 
            id, 
            name, 
            model,
            series,
            internalCode,
            externalCode,
            cost,
            dailyWorkTime,
            estimatedChangeoverDate,
            changeoverFrequencyTime,
            changeoverFrequencyDistance,
            currentOperatingTime,
            currentOperatingDistance,
            distanceFromInstallation,
            timeFromInstallation,
            dailyWorkDistance,
            expectedServiceLife,
            expectedServiceDistance,
            manufacterId,
            createdBy, 
            updatedBy, 
            createdAt, 
            updatedAt  
        } = object;

        const componentParameter = new ComponentParameterEntity({ 
            id, 
            name, 
            model,
            series,
            internalCode,
            externalCode,
            cost,
            dailyWorkTime,
            estimatedChangeoverDate,
            changeoverFrequencyTime,
            changeoverFrequencyDistance,
            currentOperatingTime,
            currentOperatingDistance,
            distanceFromInstallation,
            timeFromInstallation,
            dailyWorkDistance,
            expectedServiceLife,
            expectedServiceDistance,
            manufacterId,
            createdBy, 
            updatedBy, 
            createdAt, 
            updatedAt 
        });

        return componentParameter;
    }

}