export class UpdateUserDependencyDto {

    constructor(
        public userId: string,
        public dependencyIds: string[]
    ) { }

    static create( object: { [key: string]: any }) : [ string[], UpdateUserDependencyDto? ] {

        const { userId, dependencyIds } = object;
        const errors : string[] = [];

        if( !userId ) errors.push( 'Missing userId' );
        if( !dependencyIds ) errors.push( 'Missing dependencyId' );

        if( errors.length > 0 ) return [ errors ];

        return [ errors , new UpdateUserDependencyDto( userId, dependencyIds )];

    }

}