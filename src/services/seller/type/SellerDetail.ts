import { SellerMainCategory } from "./SellerMainCatgory";
import { SellerPaymentMethod } from "./SellerPaymentMethod";


export class SellerDetailReference {
    categories: SellerMainCategory[] = [];
}

export class SellerDetailModel {
    code: string = "";
    createdAt: string = "";
    createdBy: number = 0;
    email: string = "";
    fullAddress: string = "";
    id: number = 0;
    mainCategoryIds: number[] = [];
    modifiedAt: string = "";
    modifiedBy: number = 0;
    name: string = "";
    phoneNumber: string = "";
    references: SellerDetailReference = new SellerDetailReference();
    serviceRadius: number = 0;
    status: string = "";
    taxCode: string = "";
    type: string = "";
    sellerPaymentMethod: SellerPaymentMethod = new SellerPaymentMethod();
}


