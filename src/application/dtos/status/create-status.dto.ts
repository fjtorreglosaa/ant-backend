export class CreateStatusDto {

    private constructor(
        public readonly name: string,
        public readonly description: string | null = null,
        public readonly createdAt: string = Date.now().toString()
    ) { }

    static create( object: { [key: string]: any }) : [ string?, CreateStatusDto? ] {

        const { name, description, createdBy, updatedBy, createdAt, updatedAt } = object;

        if ( !name ) return ['Missing name'];

        return [ undefined, new CreateStatusDto( name, description, createdBy )];
    
    }
}