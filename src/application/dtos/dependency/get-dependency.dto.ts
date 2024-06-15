export class GetDependencyDto {

    constructor(
        public id: string,
        public name: string,
        public typeId: string,
        public parentId: string,
        public createdBy: string,
        public modifiedBy: string,
        public createdAt: Date,
        public modifiedAt: Date
    ){ }

    static create( object: { [key: string]: any }) : [ string?, GetDependencyDto? ] {

        const { id, name, typeId, parentId, createdBy, modifiedBy, createdAt, modifiedAt } = object;

        if( !name ) return ['Missing name'];

        return [ undefined, new GetDependencyDto( id, name, typeId, parentId, createdBy, modifiedBy, createdAt, modifiedAt )];

    }
}