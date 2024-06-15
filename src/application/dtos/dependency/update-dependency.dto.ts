export class UpdateDependencyDto {

    constructor(
        public id: string,
        public name: string,
        public typeId: string,
        public parentId: string
    ){ }

    static create( object: { [key: string]: any }) : [ string?, UpdateDependencyDto? ] {

        const { id, name, typeId, parentId } = object;

        if( !name ) return ['Missing name'];

        return [ undefined, new UpdateDependencyDto( id, name, typeId, parentId )];

    }
}