import { PaginationRequest } from "../../pagination/PaginationRequest";

export class SellerFilterRequest extends PaginationRequest {
    createdDateMax: string | null = null;
    createdDateMin: string | null = null;
    keyword: string = "";
    sellerStatuses: Array<String> | any = [];

    constructor(data?: Partial<SellerFilterRequest>) {
        super();
        if (data) {
            Object.assign(this, data)
        }
    }
}