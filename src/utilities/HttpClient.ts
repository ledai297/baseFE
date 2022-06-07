import axios, { AxiosRequestConfig, Method } from 'axios';

var cancel: any;

export abstract class HttpClient{
    constructor(baseUrl:string){
        this.baseUrl = baseUrl;
    }
    baseUrl: string;

    initRequest(method:Method, path:string, params: any): AxiosRequestConfig{
        var request = {
            baseUrl: this.baseUrl,
            url: `${this.baseUrl}/${path}`,
            method: method,
            params: params,
            // cancelToken: new axios.CancelToken(function executor(c) {
            //     // An executor function receives a cancel function as a parameter
            //     cancel = c;
            // }),
        }
        return request;
    }
    abstract authorizeRequest(request: any): void;
    abstract convertResponseData<T>(data: any): T;
    abstract convertRequestBody(data: any):any;
    abstract processError(error:any):any;
    abstract async checkToken(request: any): Promise<any>;

    async get<T>(path:string, params:any = null): Promise<T>{
        var request = this.initRequest("get", path, params);
        try{
            await this.checkToken(request);
            this.authorizeRequest(request);
            var response = await axios(request);
            return this.convertResponseData<T>(response.data);
        }
        catch(error){
            throw this.processError(error);
        }        
    }
    async getWithCancel<T>(path:string, params:any = null): Promise<T>{
        if (cancel !== undefined) {
            cancel();
        }
        var request = this.initRequest("get", path, params);
        try{
            await this.checkToken(request);
            this.authorizeRequest(request);
            var response = await axios(request);
            return this.convertResponseData<T>(response.data);
        }
        catch(error){
            throw this.processError(error);
        }        
    }

    async post<T>(path:string, body: any, params:any = null): Promise<T>{
        var request = this.initRequest("post", path, params);
        request.data = this.convertRequestBody(body);
        try{
            await this.checkToken(request);
            this.authorizeRequest(request);
            var response = await axios(request);
            return  this.convertResponseData<T>(response.data);
        }
        catch(error){
            throw this.processError(error);
        }        
    }
    async put<T>(path:string, body: any, params:any = null): Promise<T>{
        var request = this.initRequest("put", path, params);
        request.data = this.convertRequestBody(body);
        try{
            await this.checkToken(request);
            this.authorizeRequest(request);
            var response = await axios(request);
            return  this.convertResponseData<T>(response.data);
        }
        catch(error){
            throw this.processError(error);
        }        
    }
    async delete<T>(path:string): Promise<T>{
        var request = this.initRequest("delete", path, null);
        try{
            await this.checkToken(request);
            this.authorizeRequest(request);
            var response = await axios(request);
            return this.convertResponseData<T>(response.data);
        }
        catch(error){
            throw this.processError(error);
        }        
    }
}
