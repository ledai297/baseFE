import { PaginationRequest } from "../../pagination/PaginationRequest";

export class SellerVariantFilterRequest extends PaginationRequest {
    id: number = 0;
    keyword: string | null = null;
    regionId: number | null = null;
    sellable: boolean | null= null;

    constructor(data?: Partial<SellerVariantFilterRequest>) {
        super();
        if (data) {
            Object.assign(this, data)
        }
    }
}