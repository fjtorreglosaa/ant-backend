export class GetUserDependencyDto {

    constructor(
        public id: string,
        public userId: string,
        public dependencyId: string,
        public createdBy: string,
        public updatedBy: string,
        public createdAt: string,
        public updatedAt: string
    ) { }

    static create( object: { [key: string]: any }) : [ string[], GetUserDependencyDto? ] {

        const { id, userId, dependencyId, createdBy, updatedBy, createdAt, updatedAt } = object;
        const errors : string[] = [];

        if( !userId ) errors.push( 'Missing userId' );
        if( !dependencyId ) errors.push( 'Missing dependencyId' );

        if( errors.length > 0 ) return [ errors ];

        return [ errors , new GetUserDependencyDto( id, userId, dependencyId, createdBy, updatedBy, createdAt, updatedAt )];

    }
}