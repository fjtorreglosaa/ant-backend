export class CreateProfileDto {

    constructor(
        public id: string,
        public name: string,
        public groupId: string,
        public photo: string,
        public phone: string,
        public preferences: string
    ) { }

    static create( object: { [key: string]: any }) : [ string?, CreateProfileDto? ] {

        const { id, name, groupId, photo, phone, preferences } = object;

        if( !name ) return ['Missing name'];

        return [ undefined, new CreateProfileDto( id, name, groupId, photo, phone, preferences )];

    }

}