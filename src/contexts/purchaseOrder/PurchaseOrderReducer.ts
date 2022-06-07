import { Reducer } from "react";
import Action from "../Action";
import _ from 'lodash';
import { PurchaseOrderLineItemModel, PurchaseOrderState, PurchaseOrderVendor, VendorAddress } from "./PurchaseOrderState";
import { purchaseOrderActions } from "./PurchaseOrderActions";
import { PurchaseOrderModel } from "../../services/purchaseOrder";

const PurchaseOrderReducer : Reducer<PurchaseOrderState, Action> = (state: PurchaseOrderState, action: Action) => {
    const newState = _.cloneDeep(state);
    switch(action.type){
        case purchaseOrderActions.SET_PURCHASE_ORDER:
            newState.buildPurchaseOrderModel(action.payload as PurchaseOrderModel);
            break;
        
        case purchaseOrderActions.PURCHASE_ORDER_SET_LINE_ITEMS:
            newState.purchaseOrderLineItems = action.payload as Array<PurchaseOrderLineItemModel>;
            newState.calculate();
            break;

        case purchaseOrderActions.PURCHASE_ORDER_ADD_LINE_ITEM:
            newState.addLineItem(action.payload as PurchaseOrderLineItemModel);
            newState.calculate();
            break;

        case purchaseOrderActions.PURCHASE_ORDER_UPDATE_LINE_ITEM_PRICE:
            newState.updateLineItemPrice(action.payload.variantId, action.payload.price);
            break;
        
        case purchaseOrderActions.PURCHASE_ORDER_UPDATE_LINE_ITEM_QUANTITY:
            newState.updateLineItemQuantity(action.payload.variantId, action.payload.quantity);
            break;

        case purchaseOrderActions.PURCHASE_ORDER_UPDATE_LINE_ITEM_TAX:
            newState.updateLineItemTax(action.payload.variantId, action.payload.taxRate);
            break;

        case purchaseOrderActions.PURCHASE_ORDER_SET_WAREHOUSE:
            newState.warehouse = action.payload;
            break;

        case purchaseOrderActions.PURCHASE_ORDER_REMOVE_LINE_ITEM:
            newState.removeLineItem(action.payload.variantId as number);
            break;

        case purchaseOrderActions.PURCHASE_ORDER_SET_VENDOR:
            newState.vendor = action.payload as PurchaseOrderVendor;
            break;

        case purchaseOrderActions.PURCHASE_ORDER_SET_VENDOR_ADDRESS:
            newState.vendor.vendorAddress = action.payload as VendorAddress;
            break;

        case purchaseOrderActions.SET_PURCHASED_DATE:
            newState.purchaseDate = action.payload as string;
            break;

        case purchaseOrderActions.SET_EXPECTED_DELIVERY_DATE:
            newState.expectedDeliveryDate = action.payload as string;
            break;

        case purchaseOrderActions.CLEAR_DATA:
            newState.clearData();
            break;

        default:
            break;
        
    }
    
    return newState;
}

export default PurchaseOrderReducer;