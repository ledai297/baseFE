import { SellerAttribute } from "./SellerAttribute";

export class  SellerMainCategory {
    attributes: SellerAttribute[] = [];
    code: string = "";
    id: number | null = null;
    infertility: boolean = false;
    label: string = "";
    level: number = 0;
    parentId: number | null = null;
    status: string = "";
}