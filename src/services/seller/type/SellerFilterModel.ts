import { SellerMainCategory } from "./SellerMainCatgory";

export class SellerFilterModel {
    code: string = "";
    createdAt: string = "";
    createdBy: number = 0;
    email: string = "";
    fullAddress: string = "";
    id: number | null = null;
    mainCategories: SellerMainCategory[] = [];
    mainCategoryIds: number[] = [];
    modifiedAt: String = '';
    modifiedBy: number = 0;
    name: string = "";
    phoneNumber: string = "";
    serviceRadius: number = 0;
    status: string = "";
    taxCode: string = "";
    typeSeller: string = "";
}