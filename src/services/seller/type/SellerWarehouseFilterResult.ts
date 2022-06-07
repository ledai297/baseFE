import { SellerWarehouseFilterReferences } from "./SellerWarehouseFilterReferences";
import { SellerWarehouseModel } from "./SellerWarehouseModel";

export class SellerWarehouseFilterResult {
    public reference: SellerWarehouseFilterReferences = new SellerWarehouseFilterReferences();
    public sellerWarehouses: Array<SellerWarehouseModel> = [];
}