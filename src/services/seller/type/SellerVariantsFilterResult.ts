import { PaginationResponse } from "../../pagination/PaginationResponse";
import { SellerVariantsFilterResultModel } from "./SellerVariantsFilterResultModel";

export class SellerVariantsFilterResult extends PaginationResponse {
    public variants: Array<SellerVariantsFilterResultModel> = [];
}