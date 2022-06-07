import { PurchaseOrderModel } from "../../services/purchaseOrder";
import ContextState from "../ContextState";

export class PurchaseOrderState implements ContextState {
    constructor(){
        this.purchaseOrderLineItems = [];
        this.totalAmount = 0;
        this.totalTaxAmount = 0;
        this.vendor = null;
        this.warehouse = null;
    }

    vendor: PurchaseOrderVendor | any;
    warehouse: any;
    purchaseOrderLineItems: Array<PurchaseOrderLineItemModel>;
    totalAmount: number; // Tổng tiền chưa thuế
    totalTaxAmount: number; // Tổng thuế
    createdDate: string | any = null;
    purchaseDate: string | any = null;
    expectedDeliveryDate: string | any = null;
    confirmedDate: string | any = null;
    completedDate: string | any = null;
    inventoryReceivingDate: string | any = null;
    createdBy: number | any = null;
    note: string = '';
    status: string = '';
    code: string = '';
    id: number | any = null;

    public buildPurchaseOrderModel(data: PurchaseOrderModel) {
        if (data) {
            this.createdDate = data.createdDate;
            this.purchaseDate = data.purchaseDate;
            this.expectedDeliveryDate = data.expectedDeliveryDate;
            this.confirmedDate = data.confirmedDate;
            this.createdBy = data.createdBy;
            this.note = data.note;
            this.status = data.status;
            this.code = data.code;
            this.id = data.id;
            this.completedDate = data.completedDate;
            this.inventoryReceivingDate = data.inventoryReceivingDate;
        }
    }

    public clearData() {
        this.vendor = null;
        this.warehouse = null;
        this.purchaseOrderLineItems = [];
        this.totalAmount = 0;
        this.totalTaxAmount = 0;
        this.createdDate = null;
        this.purchaseDate = null;
        this.expectedDeliveryDate = null;
        this.confirmedDate = null;
        this.completedDate = null;
        this.createdBy = null;
        this.note = '';
        this.status = '';
        this.code = '';
        this.id = null;
    }

    public addLineItem(newLineItem: PurchaseOrderLineItemModel) {
        const existLineItem = this.purchaseOrderLineItems.find((item: PurchaseOrderLineItemModel) => item.variant.id === newLineItem.variant.id);

        if (existLineItem) {
            existLineItem.quantity += 1;
        } else {
            this.purchaseOrderLineItems.push(newLineItem);
        }
        this.calculate();
    }

    public removeLineItem(variantId: number) {
        const existLineItem = this.purchaseOrderLineItems.find((item: PurchaseOrderLineItemModel) => item.variant.id === variantId);

        if (existLineItem) {
            const newLineItems = this.purchaseOrderLineItems.filter((lineItem: PurchaseOrderLineItemModel) => (
                lineItem.variant.id !== variantId
            ));
            this.purchaseOrderLineItems = newLineItems;
            this.calculate();
        }
    }

    public updateLineItemPrice(variantId: number, price: number) {
        const lineItem = this.purchaseOrderLineItems.find((item: PurchaseOrderLineItemModel) => (
            item.variant.id === variantId
        ));

        if (lineItem) {
            lineItem.price = price;
            this.calculate();
        }
    }

    public updateLineItemQuantity(variantId: number, quantity: number) {
        const lineItem = this.purchaseOrderLineItems.find((item: PurchaseOrderLineItemModel) => (
            item.variant.id === variantId
        ));

        if (lineItem) {
            lineItem.quantity = quantity;
            this.calculate();
        }
    }

    public updateLineItemTax(variantId: number, tax: number) {
        const lineItem = this.purchaseOrderLineItems.find((item: PurchaseOrderLineItemModel) => (
            item.variant.id === variantId
        ));

        if (lineItem) {
            lineItem.taxRate = tax;
            this.calculate();
        }
    }

    public changeLineItem(variantId: number, quantity: number, taxRate: number, price: number) {
        const lineItem = this.purchaseOrderLineItems.find((item: PurchaseOrderLineItemModel) => (
            item.variant.id === variantId
        ));

        if (lineItem) {
            lineItem.quantity = quantity;
            lineItem.taxRate = taxRate;
            lineItem.price = price;
            this.calculate();
        }
    }

    public deleteLineItem(variantId: number) {
        const lineItem = this.purchaseOrderLineItems.find((item: PurchaseOrderLineItemModel) => (
            item.variant.id = variantId
        ));

        if (lineItem) {
            this.purchaseOrderLineItems = this.purchaseOrderLineItems.filter((item: PurchaseOrderLineItemModel) => (
                item.variant.id !== variantId
            ));
            this.calculate();
        }
    }

    public calculate() {
        let totalAmount = 0;
        let taxAmount = 0;

        this.purchaseOrderLineItems.forEach((item: PurchaseOrderLineItemModel) => {
            const tax = item.taxRate === 'kct' ? 0 : Number(item.taxRate);
            totalAmount += item.price * item.quantity;
            taxAmount += item.price * item.quantity * tax / 100;
        });

        this.totalAmount = totalAmount;
        this.totalTaxAmount = taxAmount;
    }
};

export class PurchaseOrderLineItemModel {
    public id: number | any = null;
    public amount: number = 0;
    public price: number = 0;
    public quantity: number = 0;
    public taxAmount: number = 0;
    public taxRate: number | any = 0;
    public variant: PurchaseOrderVariantModel = new PurchaseOrderVariantModel();

    constructor(data?: Partial<PurchaseOrderLineItemModel>) {
        if (data) {
            Object.assign(this, data);
        }
    }
}

export class PurchaseOrderVariantModel {
    public barcode: string = "";
    public id: number | any = null;
    public name: string = "";
    public productId: number | any = null;
    public sku: string = "";
    public unit: string = "";
    public taxRate: string = "";

    constructor(data?: Partial<PurchaseOrderVariantModel>) {
        if (data) {
            Object.assign(this, data);
        }
    }
}

export class VendorWarehouseModel {
    public id: number | any = null
    public label: string = ''
    public line1: string = ''
    public line2: string = ''
    public phoneNumber: string = ''

    public countryId: number | any = 193
    public countryName: string = ''

    public provinceId: number | any = null
    public provinceName: string = ''

    public districtId: number | any = null
    public districtName: string = ''

    public wardId: number | any = null
    public wardName: string = ''

    constructor(data?: Partial<VendorWarehouseModel>) {
        if (data) {
            Object.assign(this, data);
        }
    }
}

export class VendorAddress {
    public label: string = ''
    public line1: string = ''
    public line2: string = ''
    public phoneNumber: string = ''

    public countryId: number | any = 193
    public provinceId: number | any = null
    public provinceName: string = ''
    public districtId: number | any = null
    public districtName: string = ''
    public wardId: number | any = null
    public wardName: string = ''
}

export class PurchaseOrderVendor {
    public code: string = '';
    public id: number | any = null
    public name: string = '';
    public phoneNumber: string = '';

    public vendorAddress: VendorAddress | any = null;

    constructor(data?: Partial<VendorWarehouseModel>) {
        if (data) {
            Object.assign(this, data);
        }
    }
}
