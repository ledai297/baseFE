import { PurchaseOrderCompleteRequest, PurchaseOrderModel } from ".";
import apiClient from "../../utilities/ApiClient";
import {
    CancelModel, ExportModel, PurchaseOrderActionLogCollection,
    PurchaseOrderCollectionModel,
    PurchaseOrderCreateModel, PurchaseOrderFilterModel,
    PurchaseOrderSingleModel, PurchaseOrderUpdateModel
} from "./type";

const purchaseOrderService = {
    async create(purchaseOrder: PurchaseOrderCreateModel) {
        try {
            return await apiClient.post<PurchaseOrderSingleModel>('api/purchase_orders', purchaseOrder);
        } catch (error) {
            throw (error);
        }
    },
    async filter(filter: PurchaseOrderFilterModel) {
        try {
            const requestParams = {
                ...filter,
                statuses: filter.statuses?.length > 0 ? filter.statuses.join(',') : '',
                userIds: filter.userIds?.length > 0 ? filter.userIds.join(',') : '',
                vendorIds: filter.vendorIds?.length > 0 ? filter.vendorIds.join(',') : '',
                warehouseIds: filter.warehouseIds?.length > 0 ? filter.warehouseIds.join(',') : '',
            };
            let response = await apiClient.get<PurchaseOrderCollectionModel>('api/purchase_orders', requestParams);
            if (Math.ceil(response.pagination.total / response.pagination.size) < requestParams.page) {
                requestParams.page = 1;
                response = await apiClient.get<any>(`api/purchase_orders`, requestParams);
            }
            return response;
        } catch (error) {
            throw (error);
        }
    },
    async getById(id: string): Promise<PurchaseOrderSingleModel> {
        try {
            return apiClient.get<PurchaseOrderSingleModel>(`api/purchase_orders/${id}`, {});
        } catch (error) {
            throw (error);
        }
    },
    async cancel(id: string, cancel: CancelModel): Promise<PurchaseOrderSingleModel> {
        try {
            return apiClient.post<any>(`api/purchase_orders/${id}/cancellation`, cancel);
        } catch (error) {
            throw (error);
        }
    },
    async confirm(id: string): Promise<PurchaseOrderSingleModel> {
        try {
            return apiClient.post<PurchaseOrderSingleModel>(`api/purchase_orders/${id}/confirm`, {});
        } catch (error) {
            throw (error);
        }
    },
    async reject(id: string): Promise<PurchaseOrderSingleModel> {
        try {
            return apiClient.post<PurchaseOrderSingleModel>(`api/purchase_orders/${id}/reject`, {});
        } catch (error) {
            throw (error);
        }
    },
    async complete(id: string, request: PurchaseOrderCompleteRequest): Promise<PurchaseOrderSingleModel> {
        try {
            return apiClient.post<PurchaseOrderSingleModel>(`api/purchase_orders/${id}/complete`, request);
        } catch (error) {
            throw (error);
        }
    },
    async update(id: string, purchaseOrder: PurchaseOrderUpdateModel): Promise<PurchaseOrderSingleModel> {
        try {
            return apiClient.put<PurchaseOrderSingleModel>(`api/purchase_orders/${id}`, purchaseOrder);
        } catch (error) {
            throw (error);
        }
    },
    async getActionLog(id: string): Promise<PurchaseOrderActionLogCollection> {
        try {
            return apiClient.get<PurchaseOrderActionLogCollection>(`api/purchase_orders/${id}/action_log`, {});
        } catch (error) {
            throw (error);
        }
    },
    async exportFile(id: any): Promise<ExportModel> {
        try {
            return apiClient.get<ExportModel>(`api/purchase_orders/${id}/pdf`, {});
        } catch (error) {
            throw (error);
        }
    },
    async getPurchaseOrderPDFModels(ids: any): Promise<Array<PurchaseOrderModel>> {
        try {
            return apiClient.get<Array<PurchaseOrderModel>>(`api/purchase_orders/pdf?ids=${ids}`);
        } catch (error) {
            throw (error);
        }
    }
}

export default purchaseOrderService;