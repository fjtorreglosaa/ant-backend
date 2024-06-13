import { PaginationDto } from "./pagination.dto";
import { SearchedTermDto } from "./searchedTerm.dto";

export class FilterDto {

    private constructor(
        public readonly pagination: PaginationDto,
        public readonly searchedTerm?: SearchedTermDto | null
    ) { }

    static create( pagination: PaginationDto, searchedTerm?: SearchedTermDto ): [ string?, FilterDto? ] {
        
        return [ undefined, new FilterDto( pagination,  searchedTerm) ];

    }
}