import { Entity } from './base.entity';

export interface ComponentChangeOptions {
    id: string;
    name?: string;
    description?: string;
    installationDate?: Date;
    removalDate?: Date;
    workOrderId?: string;
    workDescription?: string;
    technniciansObservations?: string;
    newComponent?: boolean;
    repairedComponent?: boolean;
    warrantyComponent?: boolean;
    shouldBeDisposed?: boolean;
    isAPartialRepair?: boolean;
    isATotalRepair?: boolean;
    isAWarranty?: boolean;
    installedComponentId?: string;
    uninstalledComponentId?: string;
    document?: string;
    image?: string;
    statusId?: string;
    createdBy?: string;
    updatedBy?: string;
    createdAt?: Date;
    updatedAt?: Date;
}

export class ComponentChangeEntity extends Entity {

    public id: string;
    public name?: string;
    public description?: string;
    public installationDate?: Date;
    public removalDate?: Date;
    public workOrderId?: string;
    public workDescription?: string;
    public technniciansObservations?: string;
    public newComponent?: boolean;
    public repairedComponent?: boolean;
    public warrantyComponent?: boolean;
    public shouldBeDisposed?: boolean;
    public isAPartialRepair?: boolean;
    public isATotalRepair?: boolean;
    public isAWarranty?: boolean;
    public installedComponentId?: string;
    public uninstalledComponentId?: string;
    public document?: string;
    public image?: string;
    public statusId?: string;
    public createdBy?: string;
    public updatedBy?: string;
    public createdAt?: Date;
    public updatedAt?: Date;

    constructor( options: ComponentChangeOptions )
    {
        super();
        const { 
            id, 
            name, 
            description,
            installationDate,
            removalDate,
            workOrderId,
            workDescription,
            technniciansObservations,
            newComponent,
            repairedComponent,
            warrantyComponent,
            shouldBeDisposed,
            isAPartialRepair,
            isATotalRepair,
            isAWarranty,
            installedComponentId,
            uninstalledComponentId,
            document,
            image,
            statusId,
            createdBy, 
            updatedBy, 
            createdAt, 
            updatedAt 
        } = options;

        this.id = id;
        this.name = name;
        this.description = description;
        this.installationDate = installationDate;
        this.removalDate = removalDate;
        this.workOrderId = workOrderId;
        this.workDescription = workDescription;
        this.technniciansObservations = technniciansObservations;
        this.newComponent = newComponent;
        this.repairedComponent = repairedComponent;
        this.warrantyComponent = warrantyComponent;
        this.shouldBeDisposed = shouldBeDisposed;
        this.isAPartialRepair = isAPartialRepair;
        this.isATotalRepair = isATotalRepair;
        this.isAWarranty = isAWarranty;
        this.installedComponentId = installedComponentId;
        this.uninstalledComponentId = uninstalledComponentId;
        this.document = document;
        this.image = image;
        this.statusId = statusId;
        this.createdBy = createdBy;
        this.updatedBy = updatedBy;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }

    static fromObject = ( object: { [key: string ]: any }): ComponentChangeEntity => {

        const { 
            id, 
            name, 
            description,
            installationDate,
            removalDate,
            workOrderId,
            workDescription,
            technniciansObservations,
            newComponent,
            repairedComponent,
            warrantyComponent,
            shouldBeDisposed,
            isAPartialRepair,
            isATotalRepair,
            isAWarranty,
            installedComponentId,
            uninstalledComponentId,
            document,
            image,
            statusId,
            createdBy, 
            updatedBy, 
            createdAt, 
            updatedAt 
         } = object;
        const componentChange = new ComponentChangeEntity({ 
            id, 
            name, 
            description,
            installationDate,
            removalDate,
            workOrderId,
            workDescription,
            technniciansObservations,
            newComponent,
            repairedComponent,
            warrantyComponent,
            shouldBeDisposed,
            isAPartialRepair,
            isATotalRepair,
            isAWarranty,
            installedComponentId,
            uninstalledComponentId,
            document,
            image,
            statusId,
            createdBy, 
            updatedBy, 
            createdAt, 
            updatedAt 
         });

        return componentChange;
    }

}