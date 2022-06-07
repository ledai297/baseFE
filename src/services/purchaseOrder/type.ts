import {VendorAddress, VendorModel} from "../vendor";

export class Pagination {
    public size: number = 50
    public page: number = 1
    public total: number = 0

    public constructor(
        fields?: {
            size?: number,
            page?: number,
            total?: number
        }) {
        if (fields) Object.assign(this, fields);
    }
}

export class District {
    public id: number = 0;
    public name: string = '';
    public provinceId: number = 0;

    constructor(data: Partial<District> = {}) {
        Object.assign(this, data)
    }
}

export class Province {
    public id: number = 0;
    public name: string = '';

    constructor(data: Partial<Province> = {}) {
        Object.assign(this, data)
    }
}

export class Ward {
    public id: number = 0;
    public name: string = '';
    public provinceId: number = 0;
    public districtId: number = 0;

    constructor(data: Partial<Ward> = {}) {
        Object.assign(this, data)
    }
}


export class LineItemProcess {
    public id: number = 0;
    public variantId: number = 0;
    public barcode: string = '';
    public name: string = '';
    public sku: string = '';
    public unit: string = '';
    public productId: number = 0;
    public quantity: number = 0;
    public price: number = 0;
    public taxRate: number = 0;

    constructor(data: Partial<LineItemProcess> = {}) {
        Object.assign(this, data)
    }
}

export class PurchaseOrderCreateModel {
    public vendorId: number = 0;
    public warehouseId: number = 0;
    public purchaseDate: string = '';
    public expectedDeliveryDate: string = '';
    public lineItems: Array<LineItemCreateModel> = [];
    public vendorAddress: VendorAddressModel | null = null;
    public note: string = '';

    constructor(data: Partial<PurchaseOrderCreateModel> = {}) {
        Object.assign(this, data)
    }
}

export class LineItemCreateModel {
    public variantId: number = 0;
    public quantity: number = 0;
    public taxRate: number | any = 0;
    public price: number = 0;

    constructor(data: Partial<LineItemCreateModel> = {}) {
        Object.assign(this, data)
    }
}

export class VendorAddressModel {
    public countryId: number = 0;
    public districtId: number = 0;
    public label: string = '';
    public line1: string = '';
    public line2: string = '';
    public phoneNumber: string = '';
    public provinceId: number = 0;
    public wardId: number = 0;

    constructor(data: Partial<VendorAddressModel> = {}) {
        Object.assign(this, data)
    }
}

export class PurchaseOrderModel {
    public id: number = 0;
    public code: string = '';
    public vendorId: number = 0;
    public warehouseId: number = 0;
    public purchaseDate: Date | any = null;
    public expectedDeliveryDate: Date | null = null;
    public status: string = '';
    public totalAmount: number = 0;
    public totalTaxAmount: number = 0;
    public vendorAddress: VendorAddress = new VendorAddress();
    public lineItems: Array<LineItemModel> = [];
    public confirmedDate: Date | null = null;
    public completedDate: Date | null = null;
    public cancelledDate: Date | null = null;
    public rejectedDate: Date | null = null;
    public createdBy: number = 0;
    public createdDate: Date | null = null;
    public modifiedDate: Date | null = null;
    public events: Array<DomainEvent> = [];
    public note: string = '';
    public inventoryReceivingDate: Date | any = null;

    constructor(data: Partial<PurchaseOrderModel> = {}) {
        Object.assign(this, data)
    }

}

export class LineItemModel {
    public id: number = 0;
    public barcode: string = '';
    public name: string = '';
    public sku: string = '';
    public unit: string = '';
    public variantId: number = 0;
    public quantity: number = 0;
    public taxRate: number = 0;
    public price: number = 0;
    public taxAmount: number = 0;
    public amount: number = 0;
    public createdBy: number = 0;
    public createdDate: Date | null = null;
    public modifiedDate: Date | null = null;

    constructor(data: Partial<LineItemModel> = {}) {
        Object.assign(this, data)
    }
}

export class PurchaseOrderSingleModel {
    public purchaseOrder: PurchaseOrderModel = new PurchaseOrderModel();
    public reference: PurchaseOrderReference = new PurchaseOrderReference();

    constructor(data: Partial<PurchaseOrderSingleModel> = {}) {
        Object.assign(this, data)
    }
}

export class PurchaseOrderCompleteRequest {
    public inventoryReceivingDate: string | any = null;
    constructor(data: Partial<PurchaseOrderCompleteRequest> = {}) {
        Object.assign(this, data)
    }
}

export class PurchaseOrderCollectionModel {
    public purchaseOrders: Array<PurchaseOrderModel> = [];
    public reference: PurchaseOrderReference = new PurchaseOrderReference();
    public pagination: Pagination = new Pagination();

    constructor(data: Partial<PurchaseOrderCollectionModel> = {}) {
        Object.assign(this, data)
    }
}

export class PurchaseOrderReference {
    public districts: Array<District> = [];
    public provinces: Array<Province> = [];
    public wards: Array<Ward> = [];
    public variants: Array<Variant> = [];
    public vendors: Array<VendorModel> = [];
    public users: Array<Creator> = [];
    public warehouses: Array<Warehouse> = [];

    constructor(data: Partial<PurchaseOrderReference> = {}) {
        Object.assign(this, data)
    }
}

export class Warehouse {
    public countryId: number = 0;
    public districtId: number = 0;
    public label: string = '';
    public line1: string = '';
    public line2: string = '';
    public phoneNumber: string = '';
    public provinceId: number = 0;
    public wardId: number = 0;
    public status: string = '';
    public id: number = 0;

    constructor(data: Partial<Warehouse> = {}) {
        Object.assign(this, data)
    }
}

export class Variant {
    public barcode: string = '';
    public id: number = 0;
    public name: string = '';
    public sku: string = '';
    public unit: string = '';
    public productId: number = 0;

    constructor(data: Partial<Variant> = {}) {
        Object.assign(this, data)
    }
}

export class PurchaseOrderFilterModel {
    public ids: Array<number> | any = null;
    public page: number = 1;
    public size: number = 50;
    public total: number | any = null;
    public keyword: string = '';
    public createdDateMin: string | any = '';
    public createdDateMax: string | any = '';
    public purchaseDateMin: string | any = '';
    public purchaseDateMax: string | any = '';
    public statuses: Array<string> = [];
    public userIds: Array<number> = [];
    public vendorIds: Array<number> = [];
    public warehouseIds: Array<number> = [];

    constructor(data: Partial<PurchaseOrderFilterModel> = {}) {
        Object.assign(this, data)
    }
}

export enum PurchaseOrderStatus {
    DRAFT = "DRAFT",
    CANCELLED = "CANCELLED",
    REJECTED = "REJECTED",
    CONFIRMED = "CONFIRMED",
    DELIVERING = "DELIVERING",
    COMPLETED = "COMPLETED"
}

export class Creator {
    public id: number = 0;
    public firstName: string = '';
    public lastName: string = '';
    public username: string = '';
    public email: string = '';

    constructor(data: Partial<Creator> = {}) {
        Object.assign(this, data)
    }
}

export class PurchaseOrderStatusModel {
    public status: PurchaseOrderStatus | any = null;
    public description: string = '';

    constructor(data: Partial<PurchaseOrderStatusModel> = {}) {
        Object.assign(this, data)
    }
}

export class PurchaseOrderCollectionStatus {

    public statuses: Array<PurchaseOrderStatusModel> = new Array<PurchaseOrderStatusModel>();

    public constructor() {
        this.statuses.push(new PurchaseOrderStatusModel({status: '', description: 'Tất cả'}));
        this.statuses.push(new PurchaseOrderStatusModel({
            status: PurchaseOrderStatus.DRAFT,
            description: 'Đang xác nhận'
        }));
        this.statuses.push(new PurchaseOrderStatusModel({
            status: PurchaseOrderStatus.CANCELLED,
            description: 'Đã hủy'
        }));
        this.statuses.push(new PurchaseOrderStatusModel({
            status: PurchaseOrderStatus.REJECTED,
            description: 'Đã từ chối'
        }));
        this.statuses.push(new PurchaseOrderStatusModel({
            status: PurchaseOrderStatus.CONFIRMED,
            description: 'Đã xác nhận'
        }));
        this.statuses.push(new PurchaseOrderStatusModel({
            status: PurchaseOrderStatus.DELIVERING,
            description: 'Đang vận chuyển'
        }));
        this.statuses.push(new PurchaseOrderStatusModel({
            status: PurchaseOrderStatus.COMPLETED,
            description: 'Hoàn tất'
        }));
    }
}

export class CancelModel {

    public reason: string = '';
    public reasonDetail: string = '';

    constructor(data: Partial<CancelModel> = {}) {
        Object.assign(this, data)
    }
}

export class PurchaseOrderUpdateModel {
    public warehouseId: number = 0;
    public purchaseDate: string = '';
    public expectedDeliveryDate: string = '';
    public lineItems: Array<LineItemCreateModel> = [];
    public vendorAddress: VendorAddressModel | null = null;
    public note: string = '';

    constructor(data: Partial<PurchaseOrderUpdateModel> = {}) {
        Object.assign(this, data)
    }
}

export class LineItemUpdateModel {
    public id: number = 0;
    public variantId: number = 0;
    public quantity: number = 0;
    public taxRate: number = 0;
    public price: number = 0;

    constructor(data: Partial<LineItemCreateModel> = {}) {
        Object.assign(this, data)
    }
}

export class PurchaseOrderActionLogModel {
    public action: string = '';
    public actorId: number = 0;
    public detail: string = '';
    public id: number = 0;
    public purchaseOrderId = 0;
    public vendorId = 0;
    public warehouseId = 0;

    constructor(data: Partial<PurchaseOrderActionLogModel> = {}) {
        Object.assign(this, data)
    }
}

export class PurchaseOrderActionLogCollection {
    public actionLogs: Array<PurchaseOrderActionLogModel> = [];
    public reference: PurchaseOrderActionLogReference = new PurchaseOrderActionLogReference();

    constructor(data: Partial<PurchaseOrderActionLogCollection> = {}) {
        Object.assign(this, data)
    }
}

export class DomainEvent {
    public name: string = '';
    public payload: any;
    public createdAt: Date | null = null;
}

export class FieldChangedPayload {
    public fieldName: string = '';
    public oldValue: string = '';
    public newValue: string = '';
}

export class PurchaseOrderActionLogReference{
    public users: Array<Actor> = [];

    constructor(data: Partial<PurchaseOrderActionLogReference> = {}) {
        Object.assign(this, data)
    }
}

export class Actor {
    public id: number = 0;
    public firstName: string = '';
    public lastName: string = '';
    public username: string = '';
    public email: string = '';

    constructor(data: Partial<Actor> = {}) {
        Object.assign(this, data)
    }
}

export class ExportModel{
    public bytes: any = null;

    constructor(data: Partial<ExportModel> = {}) {
        Object.assign(this, data)
    }
}

export class PurchaseOrderModal {
    public title: string = '';
    public description: string | any = '';
    public handleConfirm: any = null;
    public handleCancel: any = null;
    public confirmText: string = '';
    public cancelText: string = '';
    public bodyOverflowY: any = 'auto';
}

export class ActionLog {
    public idx: number = 0;
    public createdTime: any = '';
    public createdBy: any = '';
    public action: any = '';
    public fieldChange: any = '';
    public oldValue: any = '';
    public newValue: any = '';
}
