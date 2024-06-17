export class CreateUserDependencyDto {

    constructor(
        public userId: string,
        public dependencyIds: string[]
    ) { }

    static create( object: { [key: string]: any }) : [ string[], CreateUserDependencyDto? ] {

        const { userId, dependencyIds } = object;
        const errors : string[] = [];

        if( !userId ) errors.push( 'Missing userId' );
        if( !dependencyIds ) errors.push( 'Missing dependencyIds' );

        if( errors.length > 0 ) return [ errors ];

        return [ errors , new CreateUserDependencyDto( userId, dependencyIds )];

    }

}