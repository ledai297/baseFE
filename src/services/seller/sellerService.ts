import apiClient from "../../utilities/ApiClient";
import { SellerDetailModel } from "./type/SellerDetail";
import { SellerFilterRequest } from "./type/SellerFilterRequest";
import { SellerFilterResult } from "./type/SellerFilterResult";
import { SellerRegionalVariantModel } from "./type/SellerRegionalVariantModel";
import { SellerVariantFilterRequest } from "./type/SellerVariantsFilterRequest";
import { SellerVariantsFilterResult } from "./type/SellerVariantsFilterResult";
import { SellerWarehouseFilterResult } from "./type/SellerWarehouseFilterResult";
import { SellerWarehouseQuotasFilterResult } from "./type/SellerWarehouseQuotasFilterResult";

const sellerService = {
    async filterSellers(request: SellerFilterRequest): Promise<SellerFilterResult> {
        try {
            let response = await apiClient.get<any>("api/sellers", request)
            if (Math.ceil(response.pagination.total / response.pagination.size) < request.page) {
                request.page = 1;
                response = await apiClient.get<any>(`api/sellers`, request);
            }
            return response;
        } catch (error) {
            throw error;
        }
    },
    async filterSellerWarehouseQuotas(sellerId: number, variantId: number): Promise<SellerWarehouseQuotasFilterResult> {
        try {
            let response = await apiClient.get<any>(`api/sellers/${sellerId}/variants/${variantId}/warehouse_quota`)
            return response;
        } catch (error) {
            throw error;
        }
    },
    async fetchSellerRegionalVariantPrice(sellerId: any, variantId: any): Promise<Array<SellerRegionalVariantModel>> {
        try {
            let response = await apiClient.get<any>(`api/sellers/${sellerId}/variants/${variantId}/regional_price`)
            return response;
        } catch (error) {
            throw error;
        }
    },
    async filterSellerVariants(sellerId: number, request: SellerVariantFilterRequest): Promise<SellerVariantsFilterResult> {
        try {
            let response = await apiClient.get<SellerVariantsFilterResult>(`api/sellers/${sellerId}/variants`, request)
            if (Math.ceil(response.pagination.total / response.pagination.size) < request.page) {
                request.page = 1;
                response = await apiClient.get<SellerVariantsFilterResult>(`api/sellers/${sellerId}/variants`, request);
            }
            return response;
        } catch (error) {
            throw error;
        }
    },
    async filterSellerWarehouses(sellerId: number): Promise<SellerWarehouseFilterResult> {
        try {
            let response = await apiClient.get<SellerWarehouseFilterResult>(`api/sellers/${sellerId}/warehouses`)
            return response;
        } catch (error) {
            throw error;
        }
    },
    
    async fetchSellerDetail(id: any): Promise<SellerDetailModel> {
        try {
            let response = await apiClient.get<SellerDetailModel>(`api/sellers/${id}`);
            return response;
        } catch (error) {
            throw error;
        }
    },
    async deactivateSeller(id: any): Promise<SellerDetailModel> {
        try {
            let response = await apiClient.post<SellerDetailModel>(`api/sellers/${id}/deactivation`, {});
            return response;
        } catch (error) {
            throw error;
        }
    },
    async reactivateSeller(id: any): Promise<SellerDetailModel> {
        try {
            let response = await apiClient.post<SellerDetailModel>(`api/sellers/${id}/reactivation`, {});
            return response;
        } catch (error) {
            throw error;
        }
    },
    async rejectSeller(id: any): Promise<SellerDetailModel> {
        try {
            let response = await apiClient.post<SellerDetailModel>(`api/sellers/${id}/rejection`, {});
            return response;
        } catch (error) {
            throw error;
        }
    },
    async approveSeller(id: any): Promise<SellerDetailModel> {
        try {
            let response = await apiClient.post<SellerDetailModel>(`api/sellers/${id}/approval`, {});
            return response;
        } catch (error) {
            throw error;
        }
    },
}

export default sellerService;
