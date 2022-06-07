import { District } from "../../district";
import { Province } from "../../province";
import { WardModel } from "../../ward/type/ward";

export class SellerWarehouseFilterReferences {
    public districts: Array<District> = [];
    public provinces: Array<Province> = [];
    public wards: Array<WardModel> = []
}