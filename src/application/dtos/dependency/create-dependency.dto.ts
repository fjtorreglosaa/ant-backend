export class CreateDependencyDto {

    constructor(
        public name: string,
        public typeId: string,
        public parentId: string
    ) { }

    static create( object: { [key: string]: any }) : [ string?, CreateDependencyDto? ] {

        const { name, typeId, parentId } = object;

        if( !name ) return ['Missing name'];

        return [ undefined, new CreateDependencyDto( name, typeId, parentId )];

    }
}