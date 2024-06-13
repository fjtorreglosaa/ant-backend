export class SearchedTermDto {

    private constructor(
        public readonly term: string,
    ) { }

    static create( term: string ): [ string?, SearchedTermDto? ] {

        if( !term || term.trim() === '' ) return [ 'Term cannot be null or empty' ];
        
        return [ undefined, new SearchedTermDto( term ) ];

    }
}