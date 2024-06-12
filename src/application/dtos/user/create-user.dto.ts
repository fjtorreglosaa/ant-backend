import { regularExps } from "../../../config/plugins";
import { CreateProfileDto } from "../profile/create-profile.dto";

export class CreateUserDto {

    constructor(
        public name: string,
        public email: string,
        public password: string,
        public groupId: string,
        public photo: string,
        public phone: string,
        public preferences: string,
        public dependencyId: string
    ) { }

    static create( object: { [key: string]: any }) : [ string?, CreateUserDto? ] {

        const { name, email, password, groupId, photo, phone, preferences, dependencyId } = object;

        if( !name ) return ['Missing name'];
        if( !email ) return ['Missing email'];
        if( !regularExps.email.test( email ) ) return ['Email is not valid'];
        if( !password ) return ['Missing password'];
        if( password.length < 6 ) return ['Missing password'];
        if( !dependencyId ) return ['Missing dependency'];

        return [ undefined, new CreateUserDto( name, email, password, groupId, photo, phone, preferences, dependencyId )];

    }

}