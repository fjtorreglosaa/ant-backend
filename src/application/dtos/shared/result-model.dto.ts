export class ResultModel<T> {
    data: T | T[];
    error: boolean;
    message: string | null;
    total: number;
    pageCount: number;
    page: number;
    previousPage: string | null;
    nextPage: string | null;

    constructor(
        data: T | T[],
        message: string | null = null,
        error: boolean = false,
        total: number = 0,
        pageCount: number = 0,
        page: number = 0,
        previousPage: string | null = null,
        nextPage: string | null = null
    ) {
        this.data = data;
        this.message = message;
        this.error = error;
        this.total = total;
        this.pageCount = pageCount;
        this.page = page;
        this.previousPage = previousPage;
        this.nextPage = nextPage;
    }

    // Firmas del método sobrecargado
    static getResultModel<T>(data: T, message?: string): ResultModel<T>;
    static getResultModel<T>(data: T[], allRecords: number, message?: string, recordsPerPage?: number, page?: number): ResultModel<T[]>;

    // Implementación del método sobrecargado
    static getResultModel<T>(data: any, allRecordsOrMessage?: any, messageOrPage?: any, recordsPerPage: number = 5, page: number = 1): ResultModel<any> {
        if (Array.isArray(data)) {
            const allRecords = allRecordsOrMessage as number;
            const message = messageOrPage as string || "";
            const pageCount = data.length > 0 ? Math.ceil(allRecords / recordsPerPage) : 0;
            const previousPage = page > 1 ? `${page - 1}` : null;
            const nextPage = page < pageCount ? `${page + 1}` : null;
            return new ResultModel<T[]>(
                data,
                message,
                false,
                allRecords,
                pageCount,
                page,
                previousPage,
                nextPage
            );
        } else {
            const message = allRecordsOrMessage as string || "";
            return new ResultModel<T>(data, message, false);
        }
    }
}

// // Ejemplo de uso con objeto individual
// const result1 = ResultModel.getResultModel(1, "Success");
// console.log(result1); 
// // Output: ResultModel { data: 1, error: false, message: "Success", total: 0, pageCount: 0, page: 0, previousPage: null, nextPage: null }

// // Ejemplo de uso con lista de objetos
// const result2 = ResultModel.getResultModel([1, 2, 3], 10, "Success", 5, 1);
// console.log(result2); 
// // Output: ResultModel { data: [1, 2, 3], error: false, message: "Success", total: 10, pageCount: 2, page: 1, previousPage: null, nextPage: "2" }
