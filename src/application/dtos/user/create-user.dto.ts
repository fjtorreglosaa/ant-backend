import { regularExps } from "../../../config/plugins";

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
        if( !regularExps.symbolRegex.test(password) ) return ['The password must contain at least one special character'];
        if( !regularExps.uppercaseRegex.test(password) ) return ['The password must contain at least one capital letter.'];

        return [ undefined, new CreateUserDto( name, email, password, groupId, photo, phone, preferences, dependencyId )];

    }

}