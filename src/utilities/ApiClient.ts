import {HttpClient} from "./HttpClient";
import { tokenStorage } from "./tokenStorage";
import camelcaseKeys from 'camelcase-keys';
import snakecaseKeys from 'snakecase-keys';
import {authenticationService} from "../services/authentication/authenticationService";


class ApiClient extends HttpClient{
    constructor(){
        super(process.env.REACT_APP_API_BASE_URL||'');
    }

    async checkToken(request: any) {
        var token = tokenStorage.getToken();
        if ((!token || token === '') && tokenStorage.canRefreshToken() && request.url !== this.baseUrl + '/api/refresh_token') {
            let refreshToken = localStorage.getItem('spmRefreshToken');
            if (refreshToken !== null && refreshToken !== undefined) {
                await authenticationService.refreshToken(refreshToken);
            } else {
                tokenStorage.clearToken();
                window.location.reload();
            }
        }
    }

    async authorizeRequest(request: any) {
        var token = tokenStorage.getToken();
        if((!token || token === '') && request.url !== this.baseUrl + '/api/refresh_token'){
            return;
        }

        if(!request.headers){
            request.headers = {
                'Authorization': `Bearer ${token}`
            }
        }
        else {
            request.headers['Authorization'] = `Bearer ${token}`;
        }
    }
    convertResponseData<T>(data: any) : T {
        var camelData = camelcaseKeys(data, {deep: true}) as T;
        return camelData;
    }
    convertRequestBody(data: any) : any{
        var snakeData = data instanceof FormData ? convertObjectToSnakeKeys(data) : snakecaseKeys(data);
        return snakeData;
    }
    processError(error:any):any{
        let errorModel = {};
        if (error.response) {
            /*
            * The request was made and the server responded with a
            * status code that falls out of the range of 2xx
            */
            errorModel = camelcaseKeys(error.response.data);
             
        } else if (error.request) {
            /*
             * The request was made but no response was received, `error.request`
             * is an instance of XMLHttpRequest in the browser and an instance
             * of http.ClientRequest in Node.js
             */
            console.log(error.request);
            errorModel = {
                statusCode: null,
                errorCode: null,
                messages: ["No response was received"]
            }
            
        } else {
            // Something happened in setting up the request and triggered an Error
            console.log('Error', error.message);
            errorModel = {
                statusCode: null,
                errorCode: null,
                messages: [error.message]
            }
        }
        return errorModel;
    }
}

function camelToUnderscore(key:any) {
    return key.replace( /([A-Z])/g, "_$1" ).toLowerCase();
}

function convertObjectToSnakeKeys(original:any) {
    let newForm = new FormData();
    for(var pair of original.entries()) {
        newForm.append(camelToUnderscore(pair[0]), pair[1]);
    }
    return newForm;
}

const apiClient = new ApiClient();
export default apiClient;