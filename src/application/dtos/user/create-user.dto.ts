import { regularExps } from "../../../config/plugins";

export class CreateUserDto {

    constructor(
        public name: string,
        public email: string,
        public password: string,
    ) { }

    static create( object: { [key: string]: any }) : [ string?, CreateUserDto? ] {

        const { name, email, password } = object;

        if( !name ) return ['Missing name'];
        if( !email ) return ['Missing email'];
        if( !regularExps.email.test( email ) ) return ['Email is not valid'];
        if( !password ) return ['Missing password'];
        if( password.length < 6 ) return ['Missing password'];

        return [ undefined, new CreateUserDto( name, email, password )];

    }

}