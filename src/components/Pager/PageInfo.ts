export class PageInfo {
    public type: string = ""
    public totalCount: number = 0
    public rowsPerPage: number = 0
    public page: number = 0
    public test: string = ""

    public constructor(
        field?: {
            type?: string,
            totalCount?: number,
            rowsPerPage?: number,
            page?: number,
            test?: string
        }) {
            if (field) {
                Object.assign(this, field);
            }
        }
}