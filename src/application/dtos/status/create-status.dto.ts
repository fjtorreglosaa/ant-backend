export class CreateStatusDto {

    private constructor(
        public readonly name: string,
        public readonly description: string | null = null,
    ) { }

    static create( object: { [key: string]: any }) : [ string?, CreateStatusDto? ] {

        const { name, description } = object;

        if ( !name ) return ['Missing name'];

        return [ undefined, new CreateStatusDto( name, description )];
    
    }
}