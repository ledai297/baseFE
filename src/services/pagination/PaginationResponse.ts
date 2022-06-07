export class PaginationResponse {
    public pagination: PaginationResponseModel = new PaginationResponseModel;
}

export class PaginationResponseModel {
    public total: number | any = 0;
    public page: number | any = 1;
    public size: number | any = 50;
}