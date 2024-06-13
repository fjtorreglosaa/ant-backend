export class UpdateUserDto {

    constructor(
        public name: string,
        public password: string,
        public email: string,
        public groupId: string,
        public isActive: boolean,
        public photo: string,
        public phone: string,
        public preferences: string,
        public dependencyId: string,
        public profileId: string
    ) {}

    static create( object: { [key: string]: any }) : [ string?, UpdateUserDto? ] {

        const { name, password, email, groupId, isActive, photo, phone, preferences, dependencyId, profileId } = object;

        if ( !name && !password && !email && !groupId && !isActive && !photo && !phone && !preferences && !dependencyId && !profileId ){
            return ['Missing properties'];
        }

        return [ undefined , new UpdateUserDto( name, password, email, groupId, isActive, photo, phone, preferences, dependencyId, profileId )];

    }

}