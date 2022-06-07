import { SellerWarehouseQuotasModel } from "./SellerWarehouseQuotasModel";
import { WarehouseQuotasReference } from "./WarehouseQuotasReference";

export class SellerWarehouseQuotasFilterResult {
    public reference: WarehouseQuotasReference = new WarehouseQuotasReference();
    public warehouseQuotas: Array<SellerWarehouseQuotasModel> = []
}