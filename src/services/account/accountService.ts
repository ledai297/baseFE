import { CurrentAccount, SaveMyAccountRequest, ChangePasswordRequest } from "./type";
import apiClient from "../../utilities/ApiClient";

const accountService = {
    async getCurrentAccount(): Promise<CurrentAccount>{
        try{
            var account = await apiClient.get<CurrentAccount>("api/account");
            return account;
        }
        catch(error){
            throw error;
        }
    },
    async saveMyAccount(model: SaveMyAccountRequest): Promise<any>{
        try{
            await apiClient.put<any>("api/account", model);
            
        }
        catch(error){
            throw error;
        }
    },
    async changePassword(model: ChangePasswordRequest): Promise<any>{
        try{
            await apiClient.post<any>("api/account/change_password", model);
            
        }
        catch(error){
            throw error;
        }
    },
}
export default accountService;