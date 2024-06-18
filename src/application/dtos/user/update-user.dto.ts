export class GetUserDto {

    constructor(
        public id: string,
        public name: string,
        public email: string,
        public groupId: string,
        public isActive: boolean,
        public photo: string,
        public phone: string,
        public preferences: string,
        public dependencyId: string,
        public profileId: string
    ) { }

    static create( object: { [key: string]: any }) : [ string?, GetUserDto? ] {

        const { id, name, email, groupId, isActive, photo, phone, preferences, dependencyId, profileId } = object;

        if ( !name && !email && !groupId && !isActive && !photo && !phone && !preferences && !dependencyId && !profileId ){
            return ['Missing properties'];
        }

        return [ undefined , new GetUserDto( id, name, email, groupId, isActive, photo, phone, preferences, dependencyId, profileId )];

    }

    static fromObject = ( object: { [key: string ]: any }): GetUserDto => {

        const user = new GetUserDto( 
            object.id,
            object.name,
            object.email,
            object.groupId,
            object.isActive,
            object.photo,
            object.phone,
            object.preferences,
            object.dependencyId,
            object.profileId
        );

        return user;
    }

}