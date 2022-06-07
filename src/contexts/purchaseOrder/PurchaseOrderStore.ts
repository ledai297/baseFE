import ContextStore from "../ContextStore";
import { PurchaseOrderState } from "./PurchaseOrderState";


interface PurchaseOrderStore extends ContextStore<PurchaseOrderState>{

}
export default PurchaseOrderStore;