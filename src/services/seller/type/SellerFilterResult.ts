import { PaginationResponse } from "../../pagination/PaginationResponse";
import { SellerFilterModel } from "./SellerFilterModel";

export class SellerFilterResult extends PaginationResponse {
    public sellers: Array<SellerFilterModel> = [];
}