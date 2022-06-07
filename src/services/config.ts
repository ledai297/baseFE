import { AxiosRequestConfig } from "axios";
import qs from 'qs';
import 'nprogress/nprogress.css';
import NProgress from 'nprogress';

//export const API_BASE_URL = "https://sapo-pay.sapo.vn";
//export const API_BASE_URL = "http://192.168.13.41:8280";
//export const {REACT_APP_API_BASE_URL} = process.env;
export const REACT_APP_API_BASE_URL = "http://localhost:8080/";
const calculatePercentage = (loaded :any, total: any) => (Math.floor(loaded * 1.0) / total);
export const AXIOS_CONFIG: AxiosRequestConfig = {
    baseURL: REACT_APP_API_BASE_URL,
    timeout: 10000,
    withCredentials: true,
    responseType: 'json',
    maxContentLength: 10000,
    validateStatus: (status: number) => status >= 200 && status < 300,
    maxRedirects: 5,
    paramsSerializer(params) {
        return qs.stringify(params, { arrayFormat: 'comma' })
    },
    onDownloadProgress: (e: any) => {
        const percentage = calculatePercentage(e.loaded, e.total)
        NProgress.set(percentage);
    }
};

