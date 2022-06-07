import { AuthenticateRequest } from "./AuthenticateRequest";
import apiClient from "../../utilities/ApiClient";
import { tokenStorage } from "../../utilities/tokenStorage";

export const authenticationService = {
    authenticate: async function(model: AuthenticateRequest): Promise<string>{
        try{
            let jwt = await apiClient.post<any>("api/authenticate", model);
            tokenStorage.saveToken(jwt);
            return jwt.idToken as string;
        }
        catch(error){
            tokenStorage.clearToken();
            throw new Error(error);
        }
    },
    refreshToken: async function(token: string): Promise<string>{
        try{
            let jwt = await apiClient.post<any>("api/refresh_token", {refresh_token: token});
            tokenStorage.saveToken(jwt);
            return jwt.idToken as string;
        }
        catch(error){
            if(error.errorCode && error.errorCode == "0002"){
                tokenStorage.clearToken();
                window.location.reload();
            }
            throw new Error(error);
        }
    }
}