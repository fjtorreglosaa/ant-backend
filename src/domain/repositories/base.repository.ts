export interface IBaseRepository<Entity> {

    create(item: Entity): Promise<boolean> 
    update(id: string, item: Entity): Promise<boolean>
    delete(id: string): Promise<boolean>
    find(): Promise<Entity[]>
    findById(id: string): Promise< Entity | null >

}