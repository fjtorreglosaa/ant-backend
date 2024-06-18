export class GetDependencyDto {

    constructor(
        public id: string,
        public name: string,
        public typeId: string,
        public parentId: string,
        public createdBy: string,
        public updatedBy: string,
        public createdAt: Date,
        public updatedAt: Date
    ){ }

    static create( object: { [key: string]: any }) : [ string?, GetDependencyDto? ] {

        const { id, name, typeId, parentId, createdBy, updatedBy, createdAt, updatedAt } = object;

        if( !name ) return ['Missing name'];

        return [ undefined, new GetDependencyDto( id, name, typeId, parentId, createdBy, updatedBy, createdAt, updatedAt )];

    }
}